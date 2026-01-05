/**
 * TMDB Movie DTO (Data Transfer Object)
 *
 * Defines the shape of movie data received from the TMDB API.
 * DTOs represent data contracts between external APIs and our application.
 */
export interface TmdbMovie {
  //* Required for @for track expressions
  id: number;

  title: string;

  //! snake_case to match TMDB API response
  release_date: string;
}

/**
 * TMDB API Response Wrapper
 *
 * The API returns paginated results with metadata, not a direct array.
 */
export interface TmdbMovieResponse {
  page: number;

  //* Array of movies for the current page
  results: TmdbMovie[];

  total_pages: number;
  total_results: number;
}

