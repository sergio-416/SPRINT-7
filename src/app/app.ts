import { Component, signal } from '@angular/core';
import { MovieList } from './components/movie-list/movie-list';

@Component({
  selector: 'app-root',
  imports: [MovieList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('SPRINT-7');
}
