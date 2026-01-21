
export const TMDB_API = {
  BASE_URL: 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: 'https://image.tmdb.org/t/p',
} as const;

export const TMDB_IMAGE_SIZES = {
  POSTER_SMALL: 'w185',
  POSTER_MEDIUM: 'w342',
  POSTER_LARGE: 'w500',
  POSTER_ORIGINAL: 'original',
  BACKDROP_SMALL: 'w300',
  BACKDROP_MEDIUM: 'w780',
  BACKDROP_LARGE: 'w1280',
  BACKDROP_ORIGINAL: 'original',
} as const;

export type TmdbImageSize = typeof TMDB_IMAGE_SIZES[keyof typeof TMDB_IMAGE_SIZES];
