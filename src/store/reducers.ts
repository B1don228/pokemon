import { combineReducers } from "@reduxjs/toolkit";
import { pokemonApi } from "./slices/pokemonSlice";
import { reducer as searchReducer } from "./slices/searchSlice";
import { reducer as modalReducer } from "./slices/modalSlice";

const reducers = combineReducers({
  [pokemonApi.reducerPath]: pokemonApi.reducer,
  search: searchReducer,
  modal: modalReducer,
});

export default reducers;

export type SelectorType = ReturnType<typeof reducers>;
