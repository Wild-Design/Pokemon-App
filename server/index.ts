import express, { Express, Request, Response } from "express";
import db from "./src/db"; //importo la base de datos junto con los modelos (Pokemon y Tipo)
const { DATA_BASE } = db;
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const server: Express = express();
const PokemonsRouter = require("./src/routes/pokemons.routes");
const TypesRouter = require("./src/routes/types.routes");

server.use(
  cors({
    origin: "*",
  })
);
server.use(express.json());
server.use(morgan("dev"));
server.use(PokemonsRouter);
server.use(TypesRouter);

const { PORT } = process.env;

DATA_BASE.sync().then(() =>
  server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
  })
);
