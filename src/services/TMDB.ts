import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const tmdpApiKey = import.meta.env.VITE_TMDB_KEY;
console.log(tmdpApiKey);

export const tmdbApi = createApi({
  reducerPath: "tmdbApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.themoviedb.org/3" }),
  endpoints: (builder) => ({
    // Get movies by [type]
    getMovies: builder.query({
      query: ({ type, page = 1 }) => {
        return `${type}?page=${page}&api_key=${tmdpApiKey}`;
      },
    }),
  }),
});

export const { useGetMoviesQuery } = tmdbApi;
