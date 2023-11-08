const express = require("express");
const favorites = express.Router();
const { Favorites } = require("../models");

favorites.get("/find", (req, res) => {
  const { uid, mid } = req.query;

  Favorites.findOne({ where: { movieId: mid, userId: uid } })
    .then((fav) => res.send(fav))
    .catch((err) => res.send(err));
});

favorites.post("/register", (req, res) => {
  const { uid, mid } = req.body.data;

  Favorites.findOrCreate({ where: { movieId: mid, userId: uid } })
    .then((add) => res.send(add[1]))
    .catch((err) => res.send(err[1]));
});

favorites.delete("/delete", (req, res) => {
  const { uid, mid } = req.body;

  Favorites.destroy({ where: { movieId: mid, userId: uid } })
    .then((add) => {
      if (add > 0) return res.sendStatus(200);
      else return res.sendStatus(400);
    })
    .catch((err) => console.log("err", err));
});

favorites.get("/:id", (req, res) => {
  const { id } = req.params;

  Favorites.findAll({ where: { userId: id }, order: [["id", "DESC"]] })
    .then((favs) => res.send(favs))
    .catch((err) => res.send(err));
});

module.exports = favorites;
