import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Movies } from '../../services/movies';

@Component({
  selector: 'app-movie-list',
  imports: [],
  templateUrl: './movie-list.html',
  styleUrl: './movie-list.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieList {
  private readonly moviesService = inject(Movies);
}
