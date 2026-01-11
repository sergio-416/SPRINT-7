import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Movies } from '../../services/movies';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-movie-list',
  imports: [],
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
}
