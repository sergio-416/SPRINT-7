import { TmdbMovie } from '../../movies/interfaces/movie';

export interface ActorMovieCredits {
  id: number;
  cast: TmdbMovie[];
}
