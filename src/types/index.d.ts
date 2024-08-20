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

export interface GenreResponseProps {
  genres: GenreProps[];
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
  numberOfMovies?: number;
}

export interface AvatarGravatarProps {
  hash: string;
}

export interface AvatarTmdbProps {
  avatar_path: string | null;
}

export interface AvatarProps {
  gravatar: AvatarGravatarProps;
  tmdb: AvatarTmdbProps;
}

export interface UserProps {
  avatar: AvatarProps;
  id: number;
  include_adult: boolean;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  username: string;
}
export interface AuthStateProps {
  user: User | null;
  isAuthenticated: boolean;
  sessionId: string | null;
}

export interface BelongsToCollectionProps {
  id: number;
  name: string;
  backdrop_path: string;
  poster_path: string;
}

export interface CastMemberProps {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CrewMemberProps {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  department: string;
  job: string;
}

export interface Credits {
  cast: CastMemberProps[];
  crew: CrewMemberProps[];
}

export interface ProductionCompanyProps {
  id: number;
  logo_path: string | null;
  name: string;
  origin_country: string;
}

export interface ProductionCountryProps {
  iso_3166_1: string;
  name: string;
}

export interface SpokenLanguageProps {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface VideoProps {
  id: string;
  iso_639_1: string;
  iso_3166_1: string;
  key: string;
  name: string;
  site: string;
  size: number;
  type: string;
  official: boolean;
  published_at: string;
}

export interface MovieDetailsProps {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: BelongsToCollectionProps | null;
  budget: number;
  credits: Credits;
  genres: GenreProps[];
  homepage: string | null;
  id: number;
  imdb_id: string | null;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompanyProps[];
  production_countries: ProductionCountryProps[];
  release_date: string;
  revenue: number;
  runtime: number | null;
  spoken_languages: SpokenLanguageProps[];
  status: string;
  tagline: string | null;
  title: string;
  Props: boolean;
  vote_average: number;
  vote_count: number;
  videos: {
    results: VideoProps[];
  };
}

export interface ActorDetailsProps {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  gender: number;
  homepage: string | null;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
}
