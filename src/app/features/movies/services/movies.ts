import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TmdbMovieResponse } from '../../../interfaces/movie';
import { MovieDetails } from '../../../interfaces/movie-details';

@Injectable({
  providedIn: 'root',
})
export class Movies {
  //* Dependencies
  readonly #http = inject(HttpClient);

  //* Private helpers
  #getMoviesFromPage(page: number): Observable<TmdbMovieResponse> {
    return this.#http.get<TmdbMovieResponse>(
      `https://api.themoviedb.org/3/discover/movie?page=${page}`,
      { headers: { Authorization: `Bearer ${environment.tmdbToken}` } }
    );
  }

  //* Public API - Movie list methods
  getMovies(): Observable<TmdbMovieResponse> {
    return this.#getMoviesFromPage(1);
  }

  getMoviesPage(page: number): Observable<TmdbMovieResponse> {
    return this.#getMoviesFromPage(page);
  }

  //* Public API - Movie details methods
  getMovieDetails(id: number): Observable<MovieDetails> {
    return this.#http.get<MovieDetails>(`https://api.themoviedb.org/3/movie/${id}`, {
      headers: { Authorization: `Bearer ${environment.tmdbToken}` },
    });
  }
}
