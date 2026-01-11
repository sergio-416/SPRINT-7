import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Movies } from '../../services/movies';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-movie-details',
  imports: [],
  templateUrl: './movie-details.html',
  styleUrl: './movie-details.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieDetails {
  readonly #route = inject(ActivatedRoute);
  readonly #movieId = signal(this.#route.snapshot.params['id']);
  readonly movieId = this.#movieId.asReadonly();
  readonly #moviesService = inject(Movies);
  readonly movieDetails = toSignal(this.#moviesService.getMovieDetails(Number(this.movieId())), {
    initialValue: null,
  });
}
