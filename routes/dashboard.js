/* Recycled router for home page */

/* Call required package modules */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const session = require("express-session");
/* Call database */
const database = require("../database.js");
/* Call required package modules */
const passport = require("passport");
const initializePassport = require("../passportConfig");
initializePassport(passport);

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

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

/* Route definition */
router.get("/", checkNotAuthenticated, (req, res) => {
  const userName = req.user.firstname + " " + req.user.secondname;
  const user = req.user;
  console.log(user);
  res.render("pages/dashboard", {
    title: "Dashboard Page",
    userName: userName,
    user: user,
  });
});

/* Export router to app.js */
module.exports = router;
