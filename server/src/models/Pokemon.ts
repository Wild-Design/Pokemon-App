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
        allowNull: false,
      },
      ataque: {
        type: DataTypes.FLOAT,
        validate: {
          max: 250,
        },
        allowNull: false,
      },
      defensa: {
        type: DataTypes.FLOAT,
        validate: {
          max: 250,
        },
        allowNull: false,
      },
      velocidad: {
        type: DataTypes.FLOAT,
        validate: {
          max: 250,
        },
        allowNull: false,
      },
      altura: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      peso: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      db: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    { timestamps: false }
  );
};
