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

export interface MovieResponseProps {
  page: number;
  results: MovieDetailsProps[];
  total_pages: number;
  total_results: number;
}

export interface MovieListProps {
  movies: MovieResponseProps;
  numberOfMovies?: number;
  excludeFirst?: boolean;
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
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  homepage: string | null;
  gender: number;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  original_name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}

export interface CrewMemberProps {
  adult: boolean;
  also_known_as: string[];
  biography: string;
  birthday: string | null;
  deathday: string | null;
  homepage: string | null;
  gender: number;
  id: number;
  imdb_id: string;
  known_for_department: string;
  name: string;
  original_name: string;
  place_of_birth: string | null;
  popularity: number;
  profile_path: string | null;
  credit_id: string;
  order: number;
  department: string[];
  job: string[];
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
  images: {
    backdrops: ImageProps[];
    logos: ImageProps[];
    posters: ImageProps[];
  };
  keywords: {
    keywords: KeywordProps[];
  };
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  production_companies: ProductionCompanyProps[];
  production_countries: ProductionCountryProps[];
  release_date: string;
  release_dates: {
    results: ReleaseDatesResultProps[];
  };
  revenue: number;
  reviews: {
    page: number;
    results: ReviewProps[];
    total_pages: number;
    total_results: number;
  };
  runtime: number | null;
  similar: {
    page: number;
    results: MovieDetailsProps[];
    total_pages: number;
    total_results: number;
  };
  spoken_languages: SpokenLanguageProps[];
  status: string;
  tagline: string | null;
  title: string;
  video: boolean;
  videos: {
    results: VideoProps[];
  };
  vote_average: number;
  vote_count: number;
  external_ids: {
    imdb_id: string | null;
    facebook_id: string | null;
    instagram_id: string | null;
    twitter_id: string | null;
    wikidata_id: string | null;
  };
}

export interface ImageProps {
  aspect_ratio: number;
  file_path: string;
  height: number;
  iso_639_1: string | null;
  vote_average: number;
  vote_count: number;
  width: number;
}

export interface KeywordProps {
  id: number;
  name: string;
}

export interface ReviewProps {
  author: string;
  content: string;
  id: string;
  url: string;
}

export interface WatchProvider {
  display_priority: number;
  logo_path: string;
  provider_id: number;
  provider_name: string;
}

export interface WatchProviderProps {
  link: string;
  buy?: WatchProvider[];
  rent?: WatchProvider[];
  flatrate?: WatchProvider[];
}

export interface ReleaseDateProps {
  certification: string | null;
  descriptors: string[];
  iso_639_1: string | null;
  note: string | null;
  release_date: string;
  type: number;
}

export interface ReleaseDatesResultProps {
  iso_3166_1: string;
  release_dates: ReleaseDateProps[];
}

export interface RecommendationsProps {
  page: number;
  results: MovieDetailsProps[];
  total_pages: number;
  total_results: number;
}
