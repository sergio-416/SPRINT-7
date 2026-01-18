import { Routes } from '@angular/router';
import { MovieList } from './features/movies/components/movie-list/movie-list';
import { MovieDetails } from './features/movies/components/movie-details/movie-details';
import { Landing } from './features/home/components/landing/landing';

export const routes: Routes = [
  {
    path: '',
    component: Landing,
  },
  {
    path: 'movies',
    component: MovieList,
  },
  {
    path: 'movie/:id',
    component: MovieDetails,
  },
  { path: '**', redirectTo: '' },
];
