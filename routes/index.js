/* Recycled router for home page */

/* Call required package modules */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const session = require("express-session");
/* Call database */
const database = require("../database.js");

/* Set up application and app port */
const app = express();

//ssessions
app.use(
  session({
    resave: false,
    secret: "shh/its1asecret",
    saveUninitialized: false,
    //secure:false
  })
);

/* Route definition */
router.get("/", (req, res) => {
  const user = req.user;
  res.render("pages/index", {
    title: "Home Page",
    user: user,
  });
});

/* Export router to app.js */
module.exports = router;
