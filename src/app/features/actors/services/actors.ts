import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.development';
import { TMDB_API } from '../../../shared/constants/tmdb';
import { Actor } from '../interfaces/actor';
import { ActorMovieCredits } from '../interfaces/actor-movie-credits';
@Injectable({
  providedIn: 'root',
})
export class Actors {
  readonly #http = inject(HttpClient);
  readonly #authHeaders = {
    headers: { Authorization: `Bearer ${environment.tmdbToken}` },
  };
  getActor(id: number): Observable<Actor> {
    return this.#http.get<Actor>(`${TMDB_API.BASE_URL}/person/${id}`, this.#authHeaders);
  }
  getActorCredits(id: number): Observable<ActorMovieCredits> {
    return this.#http.get<ActorMovieCredits>(
      `${TMDB_API.BASE_URL}/person/${id}/movie_credits`,
      this.#authHeaders
    );
  }
}
