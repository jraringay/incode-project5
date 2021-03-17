// Call required package modules
const express = require("express");
const router = express.Router();
const session = require("express-session");
const passport = require("passport");
const initializePassport = require("../passportConfig");
initializePassport(passport);

// Call database 
const { pool } = require("../database.js");

// Set up application 
const app = express();

//sessions
app.use(
  session({
    resave: false,
    secret: "shh/its1asecret",
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

//Pack for reading environmental variables
const dotenv = require("dotenv");
dotenv.config();

//Route definition for sending through rating information
router.post("/", (req, res) => {
  const userId = req.user.user_id;
  const movie_id = Number(req.body.movie_id);
  const movieScore = Number(req.body.rating);

  //Update a user rating if the user has already rated that movie
  pool.query(
    `SELECT * FROM ratings WHERE user_id = $1 AND movie_id = $2 ;`, 
    [userId, movie_id])
      .then((results) => {
        if (results.rows.length === 1) {
          pool.query(`UPDATE ratings SET rating_score = $1, updated_at = NOW() where user_id = $2 and movie_id = $3 ;`,
          [movieScore, userId, movie_id])
         .then(()=> {
          req.flash("success_msg", "You scored the movie!")
          res.redirect(`/movie/${movie_id}`)
        })
        }
        else { //Insert a user rating if the user has not already rated that movie
          pool.query(`INSERT INTO ratings (movie_id, user_id, rating_score) VALUES ($1, $2, $3) RETURNING user_id, movie_id ;`,
          [movie_id, userId, movieScore])
          .then(()=> {
          req.flash("success_msg", "You scored the movie!")
          res.redirect(`/movie/${movie_id}`)
          })
        }
      })
      .catch((err) => {
        throw err
      })
});

/* Export router to app.js */
module.exports = router;
