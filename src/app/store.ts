import { tmdbApi } from '@/services/TMDB';
import {configureStore} from '@reduxjs/toolkit';

export default configureStore({
    reducer: {
      [tmdbApi.reducerPath]: tmdbApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(tmdbApi.middleware),
})