const express = require("express");
const router = express.Router();

const movies = require("./movies");
const users = require("./users");
const favorites = require("./favorites");

router.use("/movies", movies);
router.use("/users", users);
router.use("/favorites", favorites);

module.exports = router;
