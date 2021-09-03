const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const userRoutes = require("./routes/user");
const saucesRoutes = require("./routes/sauces");

const app = express();

mongoose
  .connect(
    "mongodb+srv://laeti:Winter.123@cluster0.c3i2i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Création du middleware contenant les headers de la réponse
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Pour transformer le corps de la requête en objet JavaScript utilisable
app.use(bodyParser.json());

app.use("/api/auth", userRoutes);
app.use("api/sauces", saucesRoutes);

module.exports = app;
