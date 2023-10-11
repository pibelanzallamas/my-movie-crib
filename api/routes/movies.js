const express = require("express");
const movies = express.Router();
const axios = require("axios");
const apiKey = "ebb32fdb62249487ff7cd93e333eec6d";

movies.get(`/home/:pag`, (req, res) => {
  const { pag } = req.params;
  axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=es-MX&page=${pag}`
    )
    .then((response) => {
      const movies = response.data.results;
      res.send(movies);
    });
});

movies.get("/search/:id", (req, res) => {
  const id = req.params.id;
  axios
    .get(`https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}`)
    .then((response) => {
      res.send(response.data);
    })
    .catch((error) => {
      res.send(error);
      console.error("Error:", error);
    });
});

movies.get("/:name", (req, res) => {
  axios
    .get(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${req.params.name}`
    )
    .then((response) => {
      const movies = response.data.results;
      res.send(movies);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
});

module.exports = movies;
