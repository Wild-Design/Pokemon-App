import express, { Express, Request, Response } from "express";
import db from "./src/db"; //importo la base de datos junto con los modelos (Pokemon y Tipo)
const morgan = require("morgan");
require("dotenv").config();

const server: Express = express();
const PokemonsRouter = require("./src/routes/pokemons.routes");
const TypesRouter = require("./src/routes/types.routes");

server.use(express.json());
server.use(morgan("dev"));
server.use(PokemonsRouter);
server.use(TypesRouter);

const { PORT } = process.env;

db.DATA_BASE.sync().then(() =>
  server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  })
);
