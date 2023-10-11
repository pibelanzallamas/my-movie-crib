const express = require("express");
const users = express.Router();
const { Users } = require("../models");
const { generateToken, validateToken } = require("../config/tokens.js");

users.post("/register", function (req, res) {
  const { email, name, lastname, password } = req.body;

  Users.findOrCreate({
    where: { email },
    defaults: {
      name,
      lastname,
      password,
    },
  })
    .then((user, created) => {
      if (created) {
        res.send(user);
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      res.send(err);
    });
});

users.post("/login", (req, res) => {
  const { email, password } = req.body;

  Users.findOne({
    where: { email },
  })
    .then((user) => {
      if (!user) return res.sendStatus(401);

      user.validatePassword(password).then((isValid) => {
        if (!isValid) return res.sendStatus(401);

        const payload = {
          id: user.id,
          email: user.email,
          name: user.name,
          lastname: user.lastname,
        };
        const token = generateToken(payload);
        res.cookie("token", token);
        res.send(payload);
      });
    })
    .catch((err) => res.send(err));
});

users.get("/me", (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  const { payload } = validateToken(token);
  if (!payload) return res.sendStatus(401);

  res.send(payload);
});

users.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.sendStatus(204);
});

module.exports = users;
