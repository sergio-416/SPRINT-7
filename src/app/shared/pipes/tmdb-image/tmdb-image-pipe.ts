import { Pipe, PipeTransform } from '@angular/core';
import { TMDB_API, TMDB_IMAGE_SIZES, TmdbImageSize } from '../../constants/tmdb';

@Pipe({
  name: 'tmdbImage',
})
export class TmdbImagePipe implements PipeTransform {
  transform(path: string | null, size: TmdbImageSize = TMDB_IMAGE_SIZES.POSTER_LARGE): string {
    if (!path) {
      return '';
    }

    const normalizedPath = path.startsWith('/') ? path : `/${path}`;
    return `${TMDB_API.IMAGE_BASE_URL}/${size}${normalizedPath}`;
  }
}
