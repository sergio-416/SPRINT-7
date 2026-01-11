import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { MovieList } from './movie-list';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Movies } from '../../services/movies';
import { TmdbMovieResponse } from '../../interfaces/movie';
import { RouterLink } from '@angular/router';
import { By } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';

describe('MovieList', () => {
  let component: MovieList;
  let fixture: ComponentFixture<MovieList>;
  let httpTestingController: HttpTestingController;
  let getMoviesSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieList],
      providers: [provideHttpClient(), provideHttpClientTesting(), provideRouter([])],
    }).compileComponents();

    const moviesService = TestBed.inject(Movies);
    getMoviesSpy = vi.spyOn(moviesService, 'getMovies');
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(MovieList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have movies signal', () => {
    expect(component.movies).toBeDefined();
  });

  it('should call getMovies on init', () => {
    fixture.detectChanges();
    expect(getMoviesSpy).toHaveBeenCalled();
  });

  it('should render movie titles and release dates', () => {
    const mockMovies = [
      { id: 1, title: 'Test Movie 1', release_date: '2024-01-01' },
      { id: 2, title: 'Test Movie 2', release_date: '2024-02-15' },
    ];
    const mockResponse: TmdbMovieResponse = {
      page: 1,
      results: mockMovies,
      total_pages: 1,
      total_results: 2,
    };
    fixture.detectChanges();
    const req = httpTestingController.expectOne('https://api.themoviedb.org/3/discover/movie');
    req.flush(mockResponse);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Test Movie 1');
    expect(compiled.textContent).toContain('Test Movie 2');
    expect(compiled.textContent).toContain('2024-01-01');
    expect(compiled.textContent).toContain('2024-02-15');
  });

  it('should have routerLink for each movie pointing to movie details page', () => {
    const mockMovies = [
      { id: 1, title: 'Test Movie 1', release_date: '2024-01-01' },
      { id: 2, title: 'Test Movie 2', release_date: '2024-02-15' },
    ];
    const mockResponse: TmdbMovieResponse = {
      page: 1,
      results: mockMovies,
      total_pages: 1,
      total_results: 2,
    };
    fixture.detectChanges();
    const req = httpTestingController.expectOne('https://api.themoviedb.org/3/discover/movie');
    req.flush(mockResponse);
    fixture.detectChanges();
    const linkDes = fixture.debugElement.queryAll(By.directive(RouterLink));
    const routerLinks = linkDes.map((de) => de.injector.get(RouterLink));
    expect(routerLinks.length).toBe(2);
    expect(routerLinks[0].href).toBe('/movie/1');
    expect(routerLinks[1].href).toBe('/movie/2');
  });
});
