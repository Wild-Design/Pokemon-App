require("dotenv").config();
const { Sequelize } = require("sequelize");
// const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;
const { DB_DEPLOY } = process.env;
const PokemonModel = require("./models/Pokemon");
const TipoModel = require("./models/Tipo");

const DATA_BASE = new Sequelize(
  // `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}${DB_PORT}/${DB_NAME}`, /*Local*/
  DB_DEPLOY,
  {
    logging: false,
  }
);

PokemonModel(DATA_BASE);
TipoModel(DATA_BASE);

const { Pokemon, Tipo } = DATA_BASE.models;

const PokemonTipo = DATA_BASE.define(
  //Esta función la use como una solución para quitar los timestamps de la tabla intermedia (de quisquilloso que soy nomas XD)
  "PokemonTipo",
  {},
  { timestamps: false }
);
Pokemon.belongsToMany(Tipo, { through: PokemonTipo });
Tipo.belongsToMany(Pokemon, { through: PokemonTipo });

export default { DATA_BASE, ...DATA_BASE.models };
