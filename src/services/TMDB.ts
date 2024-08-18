import { GenreResponse } from "@/types"; // Make sure this path is correct
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdpApiKey = import.meta.env.VITE_TMDB_KEY;
// console.log(tmdpApiKey);

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    // Get Genres
    getGenres: builder.query<GenreResponse, void>({
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
  }),
});

export const { useGetGenresQuery, useGetMoviesQuery } = tmdbApi;
