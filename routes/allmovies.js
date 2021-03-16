/* Call required package modules */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const session = require("express-session");
/* Call database */
const { pool } = require("../database.js");
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

router.get("/", (req, res) => {
  const user = req.user;
  res.render("pages/allmovies", {
    title: "Most rated movies",
    user: user,
  });
});

/* Export router to app.js */
module.exports = router;
