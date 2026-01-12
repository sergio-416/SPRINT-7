import { TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { Movies } from './movies';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { TmdbMovieResponse } from '../interfaces/movie';
import { MovieDetails } from '../interfaces/movie-details';

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

  //! Service instantiation
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //! getMovies() method tests
  it('should have getMovies method that returns Observable<TmdbMovieResponse>', () => {
    expect(service.getMovies).toBeDefined();
    expect(typeof service.getMovies).toBe('function');
    const result = service.getMovies();
    expect(result).toBeInstanceOf(Observable);
  });

  it('should call correct TMDB endpoint with GET', () => {
    service.getMovies().subscribe();
    const req = httpTestingController.expectOne(
      'https://api.themoviedb.org/3/discover/movie?page=1'
    );
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
    const req = httpTestingController.expectOne(
      'https://api.themoviedb.org/3/discover/movie?page=1'
    );
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
    const req = httpTestingController.expectOne(
      'https://api.themoviedb.org/3/discover/movie?page=1'
    );
    req.error(new ProgressEvent('error'), { status: 404, statusText: 'Not Found' });
  });

  it('should have getMoviesPage method returning Observable<TmdbMovieResponse>', () => {
    expect(service.getMoviesPage).toBeDefined();
    const result = service.getMoviesPage(2);
    expect(result).toBeInstanceOf(Observable);
  });

  it('should call correct TMDB endpoint with page parameter', () => {
    service.getMoviesPage(3).subscribe();
    const req = httpTestingController.expectOne(
      'https://api.themoviedb.org/3/discover/movie?page=3'
    );
    expect(req.request.method).toBe('GET');
    req.flush({ page: 3, results: [], total_pages: 10, total_results: 200 });
  });

  //! getMovieDetails() method tests
  it('should have getMovieDetails method that returns Observable<MovieDetails>', () => {
    expect(service.getMovieDetails).toBeDefined();
    expect(typeof service.getMovieDetails).toBe('function');
    const result = service.getMovieDetails(1);
    expect(result).toBeInstanceOf(Observable);
  });

  it('should call correct TMDB endpoint with GET', () => {
    service.getMovieDetails(1).subscribe();
    const req = httpTestingController.expectOne('https://api.themoviedb.org/3/movie/1');
    expect(req.request.method).toBe('GET');
  });

  it('should handle successful API response', () => {
    const mockResponse: MovieDetails = {
      id: 1,
      title: 'Test Movie',
      original_title: 'Test Movie',
      overview: 'Test Overview',
      tagline: 'Test Tagline',
      release_date: '2024-01-01',
      runtime: 120,
      status: 'Test Status',
      homepage: 'https://test.com',
      genres: [{ id: 1, name: 'Test Genre' }],
      production_companies: [
        { id: 1, name: 'Test Production Company', logo_path: null, origin_country: 'US' },
      ],
      production_countries: [{ iso_3166_1: 'US', name: 'United States' }],
      spoken_languages: [{ english_name: 'English', iso_639_1: 'en', name: 'English' }],
      budget: 1000000,
      revenue: 2000000,
      poster_path: 'https://test.com/poster.jpg',
      backdrop_path: 'https://test.com/backdrop.jpg',
      imdb_id: 'tt1234567890',
      original_language: 'en',
      popularity: 100,
      vote_average: 8.5,
      vote_count: 100,
      video: false,
      adult: false,
    };
    service.getMovieDetails(1).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });
    const req = httpTestingController.expectOne('https://api.themoviedb.org/3/movie/1');
    req.flush(mockResponse);
  });

  it('should handle error response', () => {
    service.getMovieDetails(1).subscribe({
      next: () => {
        throw new Error('should have failed');
      },
      error: (error) => {
        expect(error.status).toBeDefined();
      },
    });
    const req = httpTestingController.expectOne('https://api.themoviedb.org/3/movie/1');
    req.error(new ProgressEvent('error'), { status: 404, statusText: 'Not Found' });
  });
});
