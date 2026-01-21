import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { toSignal, toObservable } from '@angular/core/rxjs-interop';
import { switchMap } from 'rxjs/operators';
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
  readonly actorId = input.required<string>();
  readonly #actorService = inject(Actors);
  readonly #numericActorId = computed(() => Number(this.actorId()));
  readonly actorDetails = toSignal(
    toObservable(this.#numericActorId).pipe(switchMap((id) => this.#actorService.getActor(id)))
  );
  readonly filmography = toSignal(
    toObservable(this.#numericActorId).pipe(
      switchMap((id) => this.#actorService.getActorCredits(id))
    )
  );
  protected readonly profileSize = TMDB_IMAGE_SIZES.POSTER_LARGE;
}
