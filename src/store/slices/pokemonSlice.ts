import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPokemonInfo } from "../../Types";

type TypePokemons = {
  count: number;
  next: string | null;
  previous: string | null;
  results: {
    name: string;
    url: string;
  }[];
};

export const pokemonApi = createApi({
  reducerPath: "pokemonApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://pokeapi.co/api/v2/",
  }),
  endpoints: (builder) => ({
    getAllPokemons: builder.query<TypePokemons, number>({
      query: (pages) => `pokemon/?offset=${pages}&limit=${9}`,
    }),
    getOnePokemon: builder.query<IPokemonInfo, number>({
      query: (number) => `pokemon/${number + 1}`,
    }),
  }),
});

export const { useGetAllPokemonsQuery, useGetOnePokemonQuery } = pokemonApi;
