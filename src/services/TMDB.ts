import { tmdpApiKey } from "@/lib/utils";
import { GenreResponseProps } from "@/types"; // Make sure this path is correct
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    getGenres: builder.query<GenreResponseProps, void>({
      query: () => {
        return `genre/movie/list?api_key=${tmdpApiKey}`;
      },
    }),

    getMovies: builder.query({
      query: ({ genreIdOrCategoryName, page, searchQuery }) => {
        // Get Movies by Category
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "string"
        ) {
          return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdpApiKey}`;
        }
        // Get Movies by Genre
        if (
          genreIdOrCategoryName &&
          typeof genreIdOrCategoryName === "number"
        ) {
          return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdpApiKey}`;
        }
        // Get Movies by Search
        if (searchQuery) {
          return `search/movie?query=${searchQuery}&page=${page}&api_key=${tmdpApiKey}`;
        }
        // Get Popular Movies by default
        return `movie/popular?page=${page}&api_key=${tmdpApiKey}`;
      },
    }),
    getMovie: builder.query({
      query: (id) =>
        `movie/${id}?append_to_response=videos,credits&api_key=${tmdpApiKey}`,
    }),
    getRecommendations: builder.query({
      query: (movie_id) =>
        `movie/${movie_id}/recommendations?api_key=${tmdpApiKey}`,
    }),
    getActor: builder.query({
      query: (id) => `person/${id}?api_key=${tmdpApiKey}`,
    }),
    getMoviesByActor: builder.query({
      query: ({ id, page }) =>
        `discover/movie?with_cast=${id}/&page=${page}&api_key=${tmdpApiKey}`,
    }),
  }),
});

export const {
  useGetGenresQuery,
  useGetMoviesQuery,
  useGetMovieQuery,
  useGetRecommendationsQuery,
  useGetActorQuery,
  useGetMoviesByActorQuery
} = tmdbApi;
