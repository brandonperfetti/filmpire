import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GenreResponse } from "@/types"; // Make sure this path is correct


const tmdpApiKey = import.meta.env.VITE_TMDB_KEY;
console.log(tmdpApiKey);

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

    // Get movies by [type]
    getMovies: builder.query({
      query: ({ type, page = 1 }) => {
        return `${type}?page=${page}&api_key=${tmdpApiKey}`;
      },
    }),
  }),
});

export const { useGetGenresQuery, useGetMoviesQuery } = tmdbApi;
