import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Movies } from './movies';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TmdbMovieResponse } from '../interfaces/movie';

describe('Movies', () => {
  let service: Movies;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    httpTestingController = TestBed.inject(HttpTestingController);

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

  it('should call correct TMDB endpoint with GET', () => {
    service.getMovies().subscribe();
    const req = httpTestingController.expectOne('https://api.themoviedb.org/3/discover/movie');
    expect(req.request.method).toBe('GET');
  });

  it('should handle successful API response', () => {
    const mockResponse: TmdbMovieResponse = {
      page: 1,
      results: [{ id: 1, title: 'Test Movie', release_date: '2024-01-01' }],
      total_pages: 1,
      total_results: 1,
    };
    service.getMovies().subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpTestingController.expectOne('https://api.themoviedb.org/3/discover/movie');
    req.flush(mockResponse);
  });

  it('should handle error response', () => {
    service.getMovies().subscribe({
      next: () => {
        throw new Error('should have failed');
      },
      error: (error) => {
        expect(error.status).toBeDefined();
      },
    });
    const req = httpTestingController.expectOne('https://api.themoviedb.org/3/discover/movie');
    req.error(new ProgressEvent('error'), { status: 404, statusText: 'Not Found' });
  });
});
