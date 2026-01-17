import { Routes } from '@angular/router';
import { MovieList } from './features/movies/components/movie-list/movie-list';
import { MovieDetails } from './features/movies/components/movie-details/movie-details';

export const routes: Routes = [
  {
    path: '',
    component: MovieList,
  },
  {
    path: 'movie/:id',
    component: MovieDetails,
  },
  { path: '**', redirectTo: '' },
];
