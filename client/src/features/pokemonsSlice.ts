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
  allPokemonsCopy: [],
  pokemonDetail: {},
  allTypes: [],
};

export const pokemonsSlice = createSlice({
  name: "pokemons",

  initialState,
  reducers: {
    getPokemons: (state, PayloadAction) => {
      state.allPokemons = PayloadAction.payload;
      state.allPokemonsCopy = PayloadAction.payload;
    },
    pokeName: (state, PayloadAction) => {
      state.allPokemons = PayloadAction.payload;
    },
    getPokemonDetail: (state, PayloadAction) => {
      if (PayloadAction.payload === "") {
        state.pokemonDetail = {};
      } else {
        state.pokemonDetail = PayloadAction.payload;
      }
    },
    allTypes: (state, PayloadAction) => {
      state.allTypes = PayloadAction.payload;
    },
    orderPokemons: (state, PayloadAction) => {
      if (PayloadAction.payload === "AZ") {
        const sort = [...state.allPokemons].sort((a: any, b: any) =>
          a.nombre.localeCompare(b.nombre)
        );
        state.allPokemons = sort;
      }
      if (PayloadAction.payload === "ZA") {
        const sort = [...state.allPokemons].sort((a: any, b: any) =>
          b.nombre.localeCompare(a.nombre)
        );
        state.allPokemons = sort;
      }
      if (PayloadAction.payload === "MAYOR-ATAQUE") {
        const sort = [...state.allPokemons].sort(
          (a: any, b: any) => b.ataque - a.ataque
        );
        state.allPokemons = sort;
      }
      if (PayloadAction.payload === "MENOR-ATAQUE") {
        const sort = [...state.allPokemons].sort(
          (a: any, b: any) => a.ataque - b.ataque
        );
        state.allPokemons = sort;
      }
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

export const getAllTypes = () => {
  return async (dispatch: any) => {
    try {
      const GET_TYPES = await axios.get("http://localhost:3001/types");
      const TYPES = GET_TYPES.data;
      dispatch(allTypes(TYPES));
    } catch (error: any) {
      console.log(error.message);
    }
  };
};

export const { getPokemons, getPokemonDetail, allTypes, orderPokemons } =
  pokemonsSlice.actions;

export default pokemonsSlice.reducer;
