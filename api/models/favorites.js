const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class Favorites extends Model {}
Favorites.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
    },
    movieId: {
      type: DataTypes.INTEGER,
    },
  },
  {
    sequelize: db,
    modelName: "favorites",
  }
);

module.exports = Favorites;
