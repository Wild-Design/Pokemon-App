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
      imagen: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        defaultValue: [
          "https://pbs.twimg.com/media/EU3aJpMXgAEUPDR?format=jpg&name=small",
        ],
      },
      vida: {
        type: DataTypes.FLOAT,
        validate: {
          max: 250,
        },
      },
      ataque: {
        type: DataTypes.FLOAT,
        validate: {
          max: 250,
        },
      },
      defensa: {
        type: DataTypes.FLOAT,
        validate: {
          max: 250,
        },
      },
      velocidad: {
        type: DataTypes.FLOAT,
        validate: {
          max: 250,
        },
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
