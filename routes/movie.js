// Call required package modules 
const express = require("express");
const router = express.Router();
const session = require("express-session");

// Call database 
const { pool } = require("../database.js");

//Set up application
const app = express();

//sessions to track users
app.use(
  session({
    resave: false,
    secret: "shh/its1asecret",
    saveUninitialized: false,
  })
);

//Can put this function in route to force login
// function checkNotAuthenticated(req, res, next) {
//   if (req.isAuthenticated()) {
//     return next();
//   }
//   res.redirect("/login");
// }

// Route definition displays specific movie details
router.get("/:movie_id", (req, res) => {

  let movie_id = req.params.movie_id
  const user = req.user;
  let averageRating = 0;

  //Get all ratings from db
  const ratingQuery = `SELECT rating_score FROM ratings WHERE movie_id = $1;`

  //Begin calculation of average rating
  pool
    .query(ratingQuery, [movie_id])
    .then((result) => {
      let total = 0
      let n = result.rows.length
      if (n > 0) {
        for (i = 0; i < n; i++) {
          total += result.rows[i].rating_score
        }
        averageRating = `Average: ${total / n.toFixed(2)}`
      }
      else averageRating = "This movie has yet to be rated"
      res.render("pages/movie", {
        title: "Movie",
        movie_id: movie_id,
        user: user,
        averageDisplayed: averageRating
      });
    })
    .catch((err) => {
      throw err
    })
})

//Export router to app.js 
module.exports = router;
