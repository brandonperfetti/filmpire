export interface CategoryProps {
  label: string;
  value: string;
  icon: string;
  route: string;
}

export interface GenreProps {
  id: number;
  name: string;
}

export interface GenreResponse {
  genres: Genre[];
}
export interface MovieProps {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface MovieResponseProps {
  page: number;
  results: MovieProps[];
  total_pages: number;
  total_results: number;
}
export interface MovieListProps {
  movies: MovieResponseProps;
}

export interface AvatarGravatar {
  hash: string;
}

export interface AvatarTmdb {
  avatar_path: string | null;
}

export interface Avatar {
  gravatar: AvatarGravatar;
  tmdb: AvatarTmdb;
}

export interface User {
  avatar: Avatar;
  id: number;
  include_adult: boolean;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  username: string;
}
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  sessionId: string | null;
}
