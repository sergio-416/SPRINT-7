import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Movies } from '../../services/movies';
import { RouterLink } from '@angular/router';
import { TmdbMovie } from '../../interfaces/movie';

@Component({
  selector: 'app-movie-list',
  imports: [RouterLink],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieList {
  //* Services (injected dependencies)
  readonly #moviesService = inject(Movies);

  //* State signals (private)
  readonly #movies = signal<TmdbMovie[]>([]);
  readonly #currentPage = signal(1);
  readonly #totalPages = signal(0);

  //* Public readonly accessors
  readonly movies = this.#movies.asReadonly();
  readonly currentPage = this.#currentPage.asReadonly();
  readonly totalPages = this.#totalPages.asReadonly();

  //* Initialization
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
