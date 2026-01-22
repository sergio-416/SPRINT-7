import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TmdbMovie } from '../../interfaces/movie';
import { TmdbImagePipe } from '../../../../shared/pipes/tmdb-image/tmdb-image-pipe';
import { VotePercentagePipe } from '../../../../shared/pipes/vote-percentage/vote-percentage-pipe';
import { TMDB_IMAGE_SIZES } from '../../../../shared/constants/tmdb';

@Component({
  selector: 'app-movie-card',
  imports: [RouterLink, TmdbImagePipe, VotePercentagePipe],
  templateUrl: './movie-card.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MovieCard {
  readonly movie = input.required<TmdbMovie>();
  protected readonly posterSize = TMDB_IMAGE_SIZES.POSTER_LARGE;
}
