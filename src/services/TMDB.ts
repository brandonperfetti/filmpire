import { tmdbApiKey } from "@/lib/utils";
import { GenreResponseProps } from "@/types"; // Make sure this path is correct
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    getList: builder.query({
      query: ({ listName, accountId, sessionId, page }) =>
        `account/${accountId}/${listName}?api_key=${tmdbApiKey}&session_id=${sessionId}&page=${page}`,
    }),

    getGenres: builder.query<GenreResponseProps, void>({
      query: () => {
        return `genre/movie/list?api_key=${tmdbApiKey}`;
      },
    }),

    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // Get Movies by Category
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdbApiKey}`;
        }
        // Get Movies by Genre
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdbApiKey}`;
        }
        // Get Movies by Search
        if (searchQuery) {
          return `search/movie?query=${searchQuery}&page=${page}&api_key=${tmdbApiKey}`;
        }
        // Get Popular Movies by default
        return `movie/popular?page=${page}&api_key=${tmdbApiKey}`;
      },
    }),

    getMovie: builder.query({
      query: (id) =>
        `movie/${id}?append_to_response=videos,credits,images,reviews,recommendations,similar,keywords,external_ids,release_dates,&api_key=${tmdbApiKey}`,
    }),

    getMovieWatchProviders: builder.query({
      query: (id) =>
        `movie/${id}/watch/providers?&api_key=${tmdbApiKey}`,
    }),

    getRecommendations: builder.query({
      query: ({ id, page }) =>
        `movie/${id}/recommendations?api_key=${tmdbApiKey}&page=${page}`,
    }),

    getActor: builder.query({
      query: (id) => `person/${id}?api_key=${tmdbApiKey}`,
    }),

    getMoviesByActor: builder.query({
      query: ({ id, page }) =>
        `discover/movie?with_cast=${id}/&page=${page}&api_key=${tmdbApiKey}`,
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetMovieWatchProvidersQuery,
  useGetRecommendationsQuery,
  useGetActorQuery,
  useGetMoviesByActorQuery,
  useGetListQuery,
} = tmdbApi;
