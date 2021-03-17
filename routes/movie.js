/* Call required package modules */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const session = require("express-session");
/* Call database */
const { pool } = require("../database.js");
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

//Can put this function in route to force login
function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

/* Route definition */
router.get("/:movie_id", (req, res) => {
  
  let movie_id = req.params.movie_id
  const user = req.user;
  let averageRating = 0;

  //User-defined functions

  const ratingQuery = `SELECT rating_score FROM ratings WHERE movie_id = $1;`
 
  pool
    .query(ratingQuery, [movie_id])
    .then ((result) => {
      //console.log(result.rows)
      let total = 0
      let n = result.rows.length
      if (n > 0) {
      for (i = 0; i < n; i++) {
        total += result.rows[i].rating_score
        //console.log(total)
      }
      averageRating = `Average: ${total/n.toFixed(2)}`
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
/*
 <h2 class="title"></h2>

        <% if(${averageDisplayed} === 0.00) { %>
          <h2 class = "user-rating"> This movie has yet to be rated! Be the first! </h2>
          <% } else { %> 
          <h2 class = "user-rating"> This is our user average <%= averageDisplayed %> </h2>
          <% } %>
          */

/* Export router to app.js */
module.exports = router;
