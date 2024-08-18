import genreOrCategoryReducer from "@/features/currentGenreOrCategory";
import userReducer from "@/features/auth";
import { tmdbApi } from "@/services/TMDB";
import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    [tmdbApi.reducerPath]: tmdbApi.reducer,
    currentGenreOrCategory: genreOrCategoryReducer,
    user: userReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tmdbApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;