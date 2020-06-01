export interface Movie {
  id: number,
  title: string,
  popularity: number,
  vote_count: number,
  poster_path: string,
  original_language: string,
  release_date: string,
  original_title: string,
  backdrop_path: string
}

export interface TvShow {
  id: number,
  name: string,
  original_name: string,
  popularity: number,
  vote_count: number,
  poster_path: string,
  original_language: string,
  first_air_date: string,
  vote_average: string,
  backdrop_path: string,
  origin_country: []
}
