import { configureStore } from "@reduxjs/toolkit";
import reducers from "./reducers";
import { pokemonApi } from "./slices/pokemonSlice";

const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});

export default store;
