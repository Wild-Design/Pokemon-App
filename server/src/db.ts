require("dotenv").config();
const { Sequelize } = require("sequelize");
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const PokemonModel = require("./models/Pokemon");
const TipoModel = require("./models/Tipo");

const DATA_BASE = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}${DB_PORT}/${DB_NAME}`,
  {
    loggin: false,
  }
);

PokemonModel(DATA_BASE);
TipoModel(DATA_BASE);

// const { Pokemon, Tipo } = DATA_BASE.models;

// Pokemon.belongsToMany(Tipo);
// Tipo.belongsToMany(Pokemon);

export default { DATA_BASE, ...DATA_BASE.models };
