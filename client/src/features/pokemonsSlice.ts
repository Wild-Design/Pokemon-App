import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import axios from "axios";

interface PokemonsState {
  allPokemons: [];
  pokemonDetail: {};
}

const initialState: PokemonsState = {
  allPokemons: [],
  pokemonDetail: {},
};

export const pokemonsSlice = createSlice({
  name: "pokemons",

  initialState,
  reducers: {
    getPokemons: (state, PayloadAction) => {
      state.allPokemons = PayloadAction.payload;
    },
    getPokemonDetail: (state, PayloadAction) => {
      state.pokemonDetail = PayloadAction.payload;
    },
  },
});

export const getAllPokemons = () => {
  return async (dispatch: any) => {
    try {
      const POKEMONS = await axios.get("http://localhost:3001/pokemons");
      const RESPONSE = POKEMONS.data;

      dispatch(getPokemons(RESPONSE));
    } catch (error: any) {
      console.log(error.message);
    }
  };
};

export const pokemonDetail = (value: string | number) => {
  return async (dispatch: any) => {
    try {
      const GET_DETAIL = await axios.get(
        `http://localhost:3001/pokemons/${value}`
      );
      const DETAIL = GET_DETAIL.data;

      dispatch(getPokemonDetail(DETAIL));
    } catch (error: any) {
      console.log(error.message);
    }
  };
};

export const { getPokemons, getPokemonDetail } = pokemonsSlice.actions;

export default pokemonsSlice.reducer;
