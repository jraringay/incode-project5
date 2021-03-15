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
    `SELECT * FROM ratings WHERE user_id = $1 AND movie_id = $2 ;`, 
    [userId, movie_id])
    /*(err, results) => {
      if (err) {
        throw err;
      }*/
      .then((results) => {
        //console.log("Results:" + results.rows.length)
        if (results.rows.length === 1) {
          pool.query(`UPDATE ratings set rating_score = $1, updated_at = NOW() where user_id = $2 and movie_id = $3 ;`,
          [movieScore, userId, movie_id])
          req.flash("success_msg", "You scored the movie!")
          res.redirect(`/movie/${movie_id}`)
          //pool.end()
        }
        
        else {
          pool.query(`INSERT INTO ratings (movie_id, user_id, rating_score) VALUES ($1, $2, $3) RETURNING user_id, movie_id ;`,
          [movie_id, userId, movieScore])
          req.flash("success_msg", "You scored the movie!")
          res.redirect(`/movie/${movie_id}`)
          //pool.end()
        }
      })
      .catch((err) => {
        throw err
      })
  
  
    



     /* })
      else if (results.rows.length = 1) {
        pool.then(`UPDATE ratings set rating_score = $1, updated_at = current_timestamp where user_id = $2 and movie_id = $3 ;`,
        [movieScore, userId, movie_id]
        
        )
      }
      
    }
    );


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
  ); */
});

/* Export router to app.js */
module.exports = router;
