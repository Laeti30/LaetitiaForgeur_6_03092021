const express = require("express");
require("dotenv").config({ path: "./config/.env" });
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const userRoutes = require("./routes/user");
const saucesRoutes = require("./routes/sauces");

const app = express();

mongoose
  .connect(
    "mongodb+srv://" +
      process.env.DB_ACCESS +
      "@cluster0.c3i2i.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

// Création du middleware contenant les headers de la réponse
app.use((req, res, next) => {
  // Pour accéder à l'API depuis n'importe quelle origine ("*")
  res.setHeader("Access-Control-Allow-Origin", "*");
  // On ajoute les headers mentionnés aux requêtes envoyées vers notre API (Origin, X-Requested-With...)
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  // Méthodes autorisées (GET, POST...)
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

// Pour transformer le corps de la requête en objet JavaScript utilisable
app.use(bodyParser.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("api/sauces", saucesRoutes);

module.exports = app;
