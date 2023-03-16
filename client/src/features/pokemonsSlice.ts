import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../app/store";
import axios from "axios";

// interface PokeObj {
//   id: any;
//   nombre: string;
//   imagen: string;
//   tipos: string[];
//   vida: string | number;
//   ataque: string | number;
//   defensa: string | number;
//   velocidad: string | number;
//   altura: string | number;
//   peso: string | number;
// }

const initialState = {
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
    pokeName: (state, PayloadAction) => {
      state.allPokemons = PayloadAction.payload;
    },
    getPokemonDetail: (state, PayloadAction) => {
      state.pokemonDetail = PayloadAction.payload;
    },
  },
});

export const getAllPokemons = (name?: string) => {
  return async (dispatch: any) => {
    try {
      const FETCH = name
        ? await axios.get(`http://localhost:3001/pokemons?name=${name}`)
        : await axios.get(`http://localhost:3001/pokemons`);

      const RESPONSE = FETCH.data;

      dispatch(getPokemons(RESPONSE));
    } catch (error: any) {
      console.log(error.message);
    }
  };
};

export const pokemonDetail = (value: any) => {
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
