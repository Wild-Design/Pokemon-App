import { Router } from "express";
import { getAllPokemons } from "../controllers/pokemonsController";
const pokemonsRouter = Router();

pokemonsRouter.get("/pokemon", getAllPokemons);

module.exports = pokemonsRouter;
