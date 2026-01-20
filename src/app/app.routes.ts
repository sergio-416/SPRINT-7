import { Routes } from '@angular/router';
import { MovieList } from './features/movies/components/movie-list/movie-list';
import { MovieDetails } from './features/movies/components/movie-details/movie-details';
import { Landing } from './features/home/components/landing/landing';
import { Login } from './features/auth/components/login/login';
import { Register } from './features/auth/components/register/register';

export const routes: Routes = [
  {
    path: '',
    component: Landing,
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
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
