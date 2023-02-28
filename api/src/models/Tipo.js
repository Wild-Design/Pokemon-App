const { DataTypes} = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Tipo', {
    ID: {
      type: DataTypes.INTEGER,
    },
    nombre: {
      type: DataTypes.STRING,
    }
});
};