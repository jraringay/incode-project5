/* Recycled router for home page */

/* Call required package modules */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");

/* Call database */
const database = require("../database.js");

//Pack for reading environmental variables
const dotenv = require("dotenv");
dotenv.config();
const API_KEI = process.env.API_KEI;

/* Route definition */
router.get("/", (req, res) => {
  res.render("pages/login", {
    title: "Login Page",
  });
});

/* Export router to app.js */
module.exports = router;
