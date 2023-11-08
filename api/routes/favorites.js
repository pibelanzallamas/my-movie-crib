const express = require("express");
const favorites = express.Router();
const { Favorites } = require("../models");

favorites.post("/register", (req, res) => {
  const { mid, uid } = req.body;
  const filtros = {
    where: {
      movieId: mid,
      userId: uid,
    },
  };
  Favorites.findOrCreate(filtros)
    .then((ok) => res.send(ok))
    .catch((err) => res.send(err));
});

favorites.get("/find", (req, res) => {
  const { uid, mid } = req.query;

  Favorites.findOne({ where: { movieId: mid, userId: uid } })
    .then((fav) => res.send(fav))
    .catch((err) => res.send(err));
});

favorites.get("/:id", (req, res) => {
  const { id } = req.params;

  Favorites.findAll({ where: { userId: id } })
    .then((favs) => res.send(favs))
    .catch((err) => res.send(err));
});

module.exports = favorites;
