import { createSlice } from "@reduxjs/toolkit";

export const genreOrCategory = createSlice({
  name: "genreOrCategory",
  initialState: {
    genreIdOrCategoryName: "",
    page: 1,
    searchQuery: "",
  },
  reducers: {
    selectGenreOrCategory: (state, action) => {
      state.genreIdOrCategoryName = action.payload;
      state.page = 1;
      state.searchQuery = "";
    },
    searchMovie: (state, action) => {
      state.genreIdOrCategoryName = "";
      state.page = 1;
      state.searchQuery = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { selectGenreOrCategory, searchMovie, setPage } = genreOrCategory.actions;

export default genreOrCategory.reducer;
