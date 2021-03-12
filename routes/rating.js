/* Call required package modules */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const initializePassport = require("../passportConfig");
initializePassport(passport);
/* Call database */
const { pool } = require("../database.js");

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

router.post("/", (req, res) => {
  const userId = req.user.user_id;
  const movie_id = Number(req.body.movie_id);
  const movieScore = Number(req.body.rating);

  console.log(userId, movie_id, movieScore);
  pool.query(
    `INSERT INTO ratings (movie_id, user_id, rating_score) VALUES ($1, $2, $3) RETURNING user_id, movie_id`,
    [movie_id, userId, movieScore],
    (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results.rows);
      req.flash("success_msg", "You scored the movie!");
      res.redirect(`/movie/${movie_id}`);
    }
  );
});

/* Export router to app.js */
module.exports = router;
