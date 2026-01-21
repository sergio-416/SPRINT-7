export interface TmdbMovie {
  id: number;
  title: string;
  release_date: string;
  poster_path: string;
  vote_average: number;
}

export interface TmdbMovieResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}
