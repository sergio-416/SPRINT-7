import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Movies } from '../../services/movies';
import { TmdbMovie } from '../../interfaces/movie';

@Component({
  selector: 'app-movie-list',
  imports: [],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieList {
  private readonly moviesService = inject(Movies);
  readonly movies = signal<TmdbMovie[]>([]);
}
