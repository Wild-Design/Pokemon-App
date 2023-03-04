import { Sequelize, UUIDV4 } from "sequelize";

const { DataTypes } = require("sequelize");

module.exports = (DATA_BASE: Sequelize) => {
  DATA_BASE.define(
    "Pokemon",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4,
      },
      nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      vida: {
        type: DataTypes.FLOAT,
      },
      ataque: {
        type: DataTypes.FLOAT,
      },
      defensa: {
        type: DataTypes.FLOAT,
      },
      velocidad: {
        type: DataTypes.FLOAT,
      },
      altura: {
        type: DataTypes.FLOAT,
      },
      peso: {
        type: DataTypes.FLOAT,
      },
      db: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
