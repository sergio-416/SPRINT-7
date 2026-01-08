import { environment } from '../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TmdbMovieResponse } from '../interfaces/movie';

@Injectable({
  providedIn: 'root',
})
export class Movies {
  private readonly http = inject(HttpClient);
  getMovies(): Observable<TmdbMovieResponse> {
    return this.http.get<TmdbMovieResponse>('https://api.themoviedb.org/3/discover/movie', {
      headers: { Authorization: `Bearer ${environment.tmdbToken}` },
    });
  }
}
