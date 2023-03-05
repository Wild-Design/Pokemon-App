import { Router } from "express";
import { getAllPokemons, getPokemonDetail } from "../controllers/pokemonsController";
const pokemonsRouter = Router();

pokemonsRouter.get("/pokemon", getAllPokemons);
pokemonsRouter.get("/pokemon/:id", getPokemonDetail);

module.exports = pokemonsRouter;
