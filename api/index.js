const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const db = require("./db");
const models = require("./models");
const routes = require("./routes");

app.use(cookieParser());

app.use(express.json());

app.use("/api", routes);

app.use("/api", (req, res) => {
  res.sendStatus(404);
});

app.use((err, req, res, next) => {
  console.log("ERROR");
  console.log(err);
  res.status(500).send(err.message);
});

db.sync({ force: false })
  .then(function () {
    console.log("Base de datos conectada correctamente!");
    app.listen(3001, () =>
      console.log("Servidor escuchando en el puerto 3001")
    );
  })
  .catch(console.error);
