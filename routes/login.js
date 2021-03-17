// Call required package modules 
const express = require("express");
const router = express.Router();
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("../passportConfig");
initializePassport(passport);

// Set up application 
const app = express();

//sessions
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

//check if user if already authenticated
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  }
  next();
}

// Route definition for login
router.get("/", checkAuthenticated, (req, res) => {
  const user = req.user;
  res.render("pages/login", {
    title: "Login Page",
    user: user,
  });
});

//Once login details verified, redirect to dashboard user profile
router.post(
  "/",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureFlash: true,
  })
);

//Export router to app.js
module.exports = router;
