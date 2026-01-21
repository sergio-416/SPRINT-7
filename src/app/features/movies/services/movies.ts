import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TmdbMovieResponse } from '../interfaces/movie';
import { MovieDetails } from '../interfaces/movie-details';
import { TMDB_API } from '../../../shared/constants/tmdb';
import { MovieCredits } from '../interfaces/movie-credits';

@Injectable({
  providedIn: 'root',
})
export class Movies {
  readonly #http = inject(HttpClient);
  readonly #authHeaders = {
    headers: { Authorization: `Bearer ${environment.tmdbToken}` },
  };
  #getMoviesFromPage(page: number): Observable<TmdbMovieResponse> {
    return this.#http.get<TmdbMovieResponse>(
      `${TMDB_API.BASE_URL}/discover/movie?page=${page}`,
      this.#authHeaders
    );
  }

  getMovies(): Observable<TmdbMovieResponse> {
    return this.#getMoviesFromPage(1);
  }

  getMoviesPage(page: number): Observable<TmdbMovieResponse> {
    return this.#getMoviesFromPage(page);
  }

  getMovieDetails(id: number): Observable<MovieDetails> {
    return this.#http.get<MovieDetails>(`${TMDB_API.BASE_URL}/movie/${id}`, this.#authHeaders);
  }
  getMovieCredits(id: number): Observable<MovieCredits> {
    return this.#http.get<MovieCredits>(`${TMDB_API.BASE_URL}/movie/${id}/credits`, this.#authHeaders);
  }

}
