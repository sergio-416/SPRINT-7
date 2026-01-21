import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movies } from '../../services/movies';
import { toSignal } from '@angular/core/rxjs-interop';
import { TmdbImagePipe } from '../../../../shared/pipes/tmdb-image/tmdb-image-pipe';
import { VotePercentagePipe } from '../../../../shared/pipes/vote-percentage/vote-percentage-pipe';
import { TMDB_IMAGE_SIZES } from '../../../../shared/constants/tmdb';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  imports: [TmdbImagePipe, VotePercentagePipe, RouterLink],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetails {
  readonly #route = inject(ActivatedRoute);
  readonly #moviesService = inject(Movies);

  readonly #movieId = signal(this.#route.snapshot.params['id']);

  readonly movieId = this.#movieId.asReadonly();
  readonly movieDetails = toSignal(this.#moviesService.getMovieDetails(Number(this.movieId())), {
    initialValue: null,
  });
  readonly movieCredits = toSignal(this.#moviesService.getMovieCredits(Number(this.movieId())), {
    initialValue: null,
  });
  protected readonly posterSize = TMDB_IMAGE_SIZES.POSTER_LARGE;
  protected readonly backdropSize = TMDB_IMAGE_SIZES.BACKDROP_ORIGINAL;
}
