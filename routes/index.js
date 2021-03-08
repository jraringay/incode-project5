/* Recycled router for home page */

/* Call required package modules */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");
/* Call database */
const database = require("../database.js");

/* Route definition */
router.get("/", (req, res) => {
  res.render("pages/index", {
    title: "Home Page",
  });
});

/* Export router to app.js */
module.exports = router;
