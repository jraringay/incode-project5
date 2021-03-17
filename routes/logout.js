// Call required package modules 
const express = require("express");
const router = express.Router();
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("../passportConfig");
initializePassport(passport);

// Set up application
const app = express();

//sessions to track users
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

//Route definition for logout
router.get("/", (req, res) => {
  const user = req.user;
  req.logOut();
  req.flash("success_msg", "You have logged out!");
  res.redirect("/");
});

// Export router to app.js 
module.exports = router;
