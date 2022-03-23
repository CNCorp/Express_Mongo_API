const express = require("express");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const articleRoutes = require("./routes/article");
const userRoutes = require("./routes/user");
const path = require("path");

require("dotenv").config();

mongoose
  .connect(process.env.DB_ACCESS)
  .then(() => console.log("Connexion à MongoDB réussie ! 🌿"))
  .catch((err) => console.log(err));

const app = express();

app.use(helmet());

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

app.use(bodyParser.json({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

// app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/articles", articleRoutes);
app.use("/api/users", userRoutes);

module.exports = app;