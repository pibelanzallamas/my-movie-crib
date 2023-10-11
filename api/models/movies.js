const { Model, DataTypes } = require("sequelize");
const db = require("../db");

class Movies extends Model {}
Movies.init(
  {
    tmdb_id: {
      type: DataTypes.INTEGER,
    },
    title: {
      type: DataTypes.STRING,
    },
    overview: {
      type: DataTypes.TEXT,
    },
    poster_path: {
      type: DataTypes.STRING,
    },
    release_date: {
      type: DataTypes.STRING,
    },
    director: {
      type: DataTypes.STRING,
    },
    genres: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize: db,
    modelName: "movies",
  }
);

module.exports = Movies;
