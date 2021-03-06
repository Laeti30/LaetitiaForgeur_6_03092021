const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
// Sécurité
const helmet = require("helmet");
const xssClean = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
require("dotenv").config();

// Routes
const userRoutes = require("./routes/user");
const saucesRoutes = require("./routes/sauces");

// Connexion à la bdd
mongoose
  .connect(process.env.DB_ACCESS, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to mongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB", err));

const app = express();

// Sécurise Express en définissant divers en-têtes HTTP
app.use(helmet());

// Sanitize les user input
app.use(xssClean());
app.use(mongoSanitize());

// Création du middleware contenant les headers de la réponse
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); //Access the API from any origin
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); //Add headers to requests to the API
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); //Methods allowed
  next();
});

// Pour transformer le corps de la requête en objet JavaScript utilisable (remplace bodyParser)
app.use(express.json());

// Comment traiter les requêtes vers le route /image
app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", userRoutes);
app.use("/api/sauces", saucesRoutes);

module.exports = app;
