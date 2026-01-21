import { environment } from '../../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TmdbMovieResponse } from '../interfaces/movie';
import { MovieDetails } from '../interfaces/movie-details';
import { TMDB_API } from '../../../shared/constants/tmdb';

@Injectable({
  providedIn: 'root',
})
export class Movies {
  readonly #http = inject(HttpClient);

  #getMoviesFromPage(page: number): Observable<TmdbMovieResponse> {
    return this.#http.get<TmdbMovieResponse>(
      `${TMDB_API.BASE_URL}/discover/movie?page=${page}`,
      { headers: { Authorization: `Bearer ${environment.tmdbToken}` } }
    );
  }

  getMovies(): Observable<TmdbMovieResponse> {
    return this.#getMoviesFromPage(1);
  }

  getMoviesPage(page: number): Observable<TmdbMovieResponse> {
    return this.#getMoviesFromPage(page);
  }

  getMovieDetails(id: number): Observable<MovieDetails> {
    return this.#http.get<MovieDetails>(`${TMDB_API.BASE_URL}/movie/${id}`, {
      headers: { Authorization: `Bearer ${environment.tmdbToken}` },
    });
  }
}
