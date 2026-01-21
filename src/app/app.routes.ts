import { Routes } from '@angular/router';
import { MovieList } from './features/movies/components/movie-list/movie-list';
import { MovieDetails } from './features/movies/components/movie-details/movie-details';
import { Landing } from './features/home/components/landing/landing';
import { Login } from './features/auth/components/login/login';
import { Register } from './features/auth/components/register/register';
import { authGuard } from './features/auth/guards/auth-guard';
import { ActorDetails } from './features/actors/components/actor-details/actor-details';

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
    canActivate: [authGuard],
  },
  {
    path: 'movie/:id',
    component: MovieDetails,
    canActivate: [authGuard],
  },
  {
    path: 'actor/:id',
    component: ActorDetails,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: '' },
];
