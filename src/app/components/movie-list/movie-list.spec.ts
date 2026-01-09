import { ComponentFixture, TestBed } from '@angular/core/testing';
import { vi } from 'vitest';
import { MovieList } from './movie-list';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { Movies } from '../../services/movies';

describe('MovieList', () => {
  let component: MovieList;
  let fixture: ComponentFixture<MovieList>;
  let getMoviesSpy: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieList],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();

    const moviesService = TestBed.inject(Movies);
    getMoviesSpy = vi.spyOn(moviesService, 'getMovies');

    fixture = TestBed.createComponent(MovieList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should inject Movies service', () => {
    expect(component['moviesService']).toBeDefined();
  });

  it('should have movies signal', () => {
    expect(component.movies).toBeDefined();
  });

  it('should call getMovies on init', () => {
    fixture.detectChanges();
    expect(getMoviesSpy).toHaveBeenCalled();
  });
});
