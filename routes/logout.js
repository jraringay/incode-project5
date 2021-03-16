/* Recycled router for home page */

/* Call required package modules */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const initializePassport = require("../passportConfig");
initializePassport(passport);

/* Set up application and app port */
const app = express();

/* Call database */
const database = require("../database.js");

//ssessions
app.use(
  session({
    resave: false,
    secret: "shh/its1asecret",
    saveUninitialized: false,
    //secure:false
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Pack for reading environmental variables
const dotenv = require("dotenv");
dotenv.config();
const API_KEI = process.env.API_KEI;

router.get("/", (req, res) => {
  const user = req.user;
  req.logOut();
  req.flash("success_msg", "You have logged out!");
  res.redirect("/");
});

/* Export router to app.js */
module.exports = router;
