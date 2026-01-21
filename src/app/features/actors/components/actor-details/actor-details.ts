import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { Actors } from '../../services/actors';
import { MovieCard } from '../../../movies/components/movie-card/movie-card';
import { TmdbImagePipe } from '../../../../shared/pipes/tmdb-image/tmdb-image-pipe';
import { TMDB_IMAGE_SIZES } from '../../../../shared/constants/tmdb';
@Component({
  selector: 'app-actor-details',
  imports: [MovieCard, TmdbImagePipe],
  templateUrl: './actor-details.html',
  styleUrl: './actor-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ActorDetails {
  readonly #route = inject(ActivatedRoute);
  readonly #actorService = inject(Actors);
  readonly #actorId = signal(this.#route.snapshot.params['id']);
  readonly actorId = this.#actorId.asReadonly();
  readonly actorDetails = toSignal(this.#actorService.getActor(Number(this.actorId())), {
    initialValue: null,
  });
  readonly filmography = toSignal(this.#actorService.getActorCredits(Number(this.actorId())), {
    initialValue: null,
  });
  protected readonly profileSize = TMDB_IMAGE_SIZES.POSTER_LARGE;
}
