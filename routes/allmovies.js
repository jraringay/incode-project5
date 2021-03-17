// Call required package modules 
const express = require("express");
const router = express.Router();
const session = require("express-session");

// Set up application
const app = express();

// Call database 
const { pool } = require("../database.js");

//sessions to track users
app.use(
  session({
    resave: false,
    secret: "shh/its1asecret",
    saveUninitialized: false,
  })
);

//Set up route to display the most rated movies
router.get("/", (req, res) => {
  const user = req.user;
  res.render("pages/allmovies", {
    title: "Most rated movies",
    user: user,
  });
});

/* Export router to app.js */
module.exports = router;
