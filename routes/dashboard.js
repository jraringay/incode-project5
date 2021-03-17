// Call required package modules
const express = require("express");
const router = express.Router();
const session = require("express-session");

// Call database 
const { pool } = require("../database.js");

// Call required package modules 
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

//Middleware function to check that user is logged 
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

//Set up route to display user profile on dashboard
router.get("/", checkNotAuthenticated, (req, res) => {
  const userName = req.user.firstname + " " + req.user.secondname;
  const user = req.user;
  const userId = req.user.user_id;
  pool.query(
    `SELECT * FROM ratings
        WHERE user_id = $1`,
    [userId],
    (err, results) => {
      if (err) {
        console.log(err);
      }
      const userResult = results.rows;
      res.render("pages/dashboard", {
        title: "Dashboard Page",
        userName: userName,
        user: user,
        userResult: userResult,
      });
    }
  );
});

// Export router to app.js 
module.exports = router;