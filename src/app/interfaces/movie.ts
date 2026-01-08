export interface TmdbMovie {
  id: number;
  title: string;
  release_date: string;
}

export interface TmdbMovieResponse {
  page: number;
  results: TmdbMovie[];
  total_pages: number;
  total_results: number;
}
