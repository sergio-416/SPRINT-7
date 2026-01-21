import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Movies } from '../../services/movies';
import { TmdbMovie } from '../../interfaces/movie';
import { MovieCard } from '../movie-card/movie-card';

@Component({
  selector: 'app-movie-list',
  imports: [MovieCard],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieList {
  readonly #moviesService = inject(Movies);

  readonly #movies = signal<TmdbMovie[]>([]);
  readonly #currentPage = signal(1);
  readonly #totalPages = signal(0);

  readonly movies = this.#movies.asReadonly();
  readonly currentPage = this.#currentPage.asReadonly();
  readonly totalPages = this.#totalPages.asReadonly();

  constructor() {
    this.#moviesService.getMovies().subscribe((response) => {
      this.#movies.set(response.results);
      this.#totalPages.set(response.total_pages);
    });
  }
  loadMore() {
    this.#moviesService.getMoviesPage(this.currentPage() + 1).subscribe((response) => {
      const current = this.#movies();
      this.#movies.set([...current, ...response.results]);
      this.#currentPage.set(response.page);
      this.#totalPages.set(response.total_pages);
    });
  }
}
