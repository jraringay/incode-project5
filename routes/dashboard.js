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
const { pool } = require("../database.js");

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
      // console.log(results.rows);
      // let movies = [];
      // let ratings = [];
      // if (results.rows.length > 0) {
      //   for (i = 0; i < results.rows.length; i++) {
      //     movies.push(results.rows[i].movie_id);
      //     ratings.push(results.rows[i].rating_score);
      //   }
      //   console.log(movies, ratings);
      //   return movies, ratings;
      // }
    }
  );

  // console.log(user);

  // res.render("pages/dashboard", {
  //   title: "Dashboard Page",
  //   userName: userName,
  //   user: user,
  // });
});

/* Export router to app.js */
module.exports = router;
