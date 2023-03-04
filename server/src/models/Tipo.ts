import { Sequelize, UUIDV4 } from "sequelize";
const { DataTypes } = require("sequelize");

module.exports = (DATA_BASE: Sequelize) => {
  DATA_BASE.define(
    "Tipo",
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4,
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
