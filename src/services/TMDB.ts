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
      query: ({ genreIdOrCategoryName, page }) => {
        switch (typeof genreIdOrCategoryName) {
          case "string":
            // Get Movies by Category
            return `movie/${genreIdOrCategoryName}?page=${page}&api_key=${tmdpApiKey}`;

          case "number":
            // Get Movies by Genre
            return `discover/movie?with_genres=${genreIdOrCategoryName}&page=${page}&api_key=${tmdpApiKey}`;

          default:
            // Get Popular Movies
            return `movie/popular?page=${page}&api_key=${tmdpApiKey}`;
        }
      },
    }),
  }),
});

export const { useGetGenresQuery, useGetMoviesQuery } = tmdbApi;
