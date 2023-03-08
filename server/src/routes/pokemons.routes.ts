import { Router } from "express";
import {
  getAllPokemons,
  getPokemonDetail,
  postPokemon,
} from "../controllers/pokemonsController";
const pokemonsRouter = Router();

pokemonsRouter.get("/pokemons", getAllPokemons);
pokemonsRouter.get("/pokemons/:id", getPokemonDetail);
pokemonsRouter.post("/pokemons", postPokemon);

module.exports = pokemonsRouter;
