import { Sequelize, UUIDV4 } from "sequelize";
const { DataTypes } = require("sequelize");

module.exports = (DATA_BASE: Sequelize) => {
  DATA_BASE.define(
    "Tipo",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      nombre: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: false,
    }
  );
};
