import { createSlice } from "@reduxjs/toolkit";

type TypeInitialState = {
  searchField: string | null;
  isLoading: boolean;
  currentPagePokemon: number;
};

const initialState: TypeInitialState = {
  searchField: null,
  isLoading: false,
  currentPagePokemon: 0,
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    search: (state, { payload }) => {
      state.searchField = payload;
    },
    loading: (state, { payload }) => {
      state.isLoading = payload;
    },
    nextPage: (state, { payload }) => {
      state.currentPagePokemon = state.currentPagePokemon + payload;
    },
    nullPage: (state) => {
      state.currentPagePokemon = 0;
    },
  },
});

export const { actions, reducer } = searchSlice;
