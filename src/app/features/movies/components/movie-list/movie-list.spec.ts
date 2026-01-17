import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { MovieList } from './movie-list';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { Movies } from '../../services/movies';
import { TmdbMovieResponse } from '../../../../interfaces/movie';
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

  //! Component instantiation
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  //! Initial state tests
  it('should have movies signal', () => {
    expect(component.movies).toBeDefined();
  });

  it('should call getMovies on init', () => {
    fixture.detectChanges();
    expect(getMoviesSpy).toHaveBeenCalled();
  });

  //! Template rendering tests
  it('should render movie titles and release dates', () => {
    const mockMovies = [
      { id: 1, title: 'Test Movie 1', release_date: '2024-01-01', poster_path: '/test-poster-1.jpg', vote_average: 7.5 },
      { id: 2, title: 'Test Movie 2', release_date: '2024-02-15', poster_path: '/test-poster-2.jpg', vote_average: 8.2 },
    ];
    const mockResponse: TmdbMovieResponse = {
      page: 1,
      results: mockMovies,
      total_pages: 1,
      total_results: 2,
    };
    fixture.detectChanges();
    const req = httpTestingController.expectOne(
      'https://api.themoviedb.org/3/discover/movie?page=1'
    );
    req.flush(mockResponse);
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.textContent).toContain('Test Movie 1');
    expect(compiled.textContent).toContain('Test Movie 2');
    expect(compiled.textContent).toContain('2024-01-01');
    expect(compiled.textContent).toContain('2024-02-15');
  });

  //! Navigation tests
  it('should have routerLink for each movie pointing to movie details page', () => {
    const mockMovies = [
      { id: 1, title: 'Test Movie 1', release_date: '2024-01-01', poster_path: '/test-poster-1.jpg', vote_average: 7.5 },
      { id: 2, title: 'Test Movie 2', release_date: '2024-02-15', poster_path: '/test-poster-2.jpg', vote_average: 8.2 },
    ];
    const mockResponse: TmdbMovieResponse = {
      page: 1,
      results: mockMovies,
      total_pages: 1,
      total_results: 2,
    };
    fixture.detectChanges();
    const req = httpTestingController.expectOne(
      'https://api.themoviedb.org/3/discover/movie?page=1'
    );
    req.flush(mockResponse);
    fixture.detectChanges();
    const linkDes = fixture.debugElement.queryAll(By.directive(RouterLink));
    const routerLinks = linkDes.map((de) => de.injector.get(RouterLink));
    expect(routerLinks.length).toBe(2);
    expect(routerLinks[0].href).toBe('/movie/1');
    expect(routerLinks[1].href).toBe('/movie/2');
  });

  //! Pagination tests
  it('should have a currentPage signal', () => {
    expect(component.currentPage).toBeDefined();
    expect(component.currentPage()).toBe(1);
  });

  it('should have totalPages signal', () => {
    expect(component.totalPages).toBeDefined();
    expect(component.totalPages()).toBe(0);
  });

  it('should load more movies and append to existing list', () => {
    const page1Movies = [
      { id: 1, title: 'Movie 1', release_date: '2024-01-01', poster_path: '/poster-1.jpg', vote_average: 7.0 },
      { id: 2, title: 'Movie 2', release_date: '2024-01-02', poster_path: '/poster-2.jpg', vote_average: 8.0 },
    ];
    const page2Movies = [
      { id: 3, title: 'Movie 3', release_date: '2024-01-03', poster_path: '/poster-3.jpg', vote_average: 6.5 },
      { id: 4, title: 'Movie 4', release_date: '2024-01-04', poster_path: '/poster-4.jpg', vote_average: 9.0 },
    ];
    const page1Response: TmdbMovieResponse = {
      page: 1,
      results: page1Movies,
      total_pages: 5,
      total_results: 100,
    };

    const page2Response: TmdbMovieResponse = {
      page: 2,
      results: page2Movies,
      total_pages: 5,
      total_results: 100,
    };
    fixture.detectChanges();

    const req1 = httpTestingController.expectOne(
      'https://api.themoviedb.org/3/discover/movie?page=1'
    );
    req1.flush(page1Response);
    fixture.detectChanges();
    component.loadMore();
    const req2 = httpTestingController.expectOne(
      'https://api.themoviedb.org/3/discover/movie?page=2'
    );
    req2.flush(page2Response);
    fixture.detectChanges();
    expect(component.movies().length).toBe(4);
    expect(component.movies()).toEqual([...page1Movies, ...page2Movies]);

    expect(component.currentPage()).toBe(2);
    expect(component.totalPages()).toBe(5);
  });

  //!Load More UI tests

  it('should show Load More button when more pages available', () => {
    const mockResponse: TmdbMovieResponse = {
      page: 1,
      results: [{ id: 1, title: 'Movie 1', release_date: '2024-01-01', poster_path: '/poster.jpg', vote_average: 7.5 }],
      total_pages: 5,
      total_results: 100,
    };
    fixture.detectChanges();

    const req = httpTestingController.expectOne(
      'https://api.themoviedb.org/3/discover/movie?page=1'
    );
    req.flush(mockResponse);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeTruthy();
    expect(button.textContent).toContain('Load More');
  });

  it('should not show Load More button when no more pages available', () => {
    const mockResponse: TmdbMovieResponse = {
      page: 1,
      results: [{ id: 1, title: 'Movie 1', release_date: '2024-01-01', poster_path: '/poster.jpg', vote_average: 7.5 }],
      total_pages: 1,
      total_results: 100,
    };
    fixture.detectChanges();
    const req = httpTestingController.expectOne(
      'https://api.themoviedb.org/3/discover/movie?page=1'
    );
    req.flush(mockResponse);
    fixture.detectChanges();
    const button = fixture.nativeElement.querySelector('button');
    expect(button).toBeNull();
  });
});
