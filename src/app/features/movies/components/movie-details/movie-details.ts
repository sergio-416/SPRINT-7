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
  //* Services (injected dependencies)
  readonly #route = inject(ActivatedRoute);
  readonly #moviesService = inject(Movies);

  //* State signals (private)
  readonly #movieId = signal(this.#route.snapshot.params['id']);

  //* Public readonly accessors
  readonly movieId = this.#movieId.asReadonly();
  readonly movieDetails = toSignal(this.#moviesService.getMovieDetails(Number(this.movieId())), {
    initialValue: null,
  });
}
