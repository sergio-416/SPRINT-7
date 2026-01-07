import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { TmdbMovieResponse } from '../interfaces/movie';

import { Movies } from './movies';

describe('Movies', () => {
  let service: Movies;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Movies);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getMovies method that returns Observable<TmdbMovieResponse>', () => {
    expect(service.getMovies).toBeDefined();
    expect(typeof service.getMovies).toBe('function');
    const result = service.getMovies();
    expect(result).toBeInstanceOf(Observable);
  });
});
