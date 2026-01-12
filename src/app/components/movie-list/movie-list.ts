import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Movies } from '../../services/movies';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  imports: [RouterLink],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieList {
  readonly #moviesService = inject(Movies);
  readonly movies = toSignal(
    this.#moviesService.getMovies().pipe(map((response) => response.results)),
    { initialValue: [] }
  );
  readonly #currentPage = signal(1);
  readonly currentPage = this.#currentPage.asReadonly();
  readonly #totalPages = signal(0);
  readonly totalPages = this.#totalPages.asReadonly();
}
