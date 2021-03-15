/* Call required package modules */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const session = require("express-session");
/* Call database */
const database = require("../database.js");
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
  //let id = req.body
  
  let movie_id = req.params.movie_id

  const user = req.user;
  //console.log(user)
  res.render("pages/movie", {
    title: "Movie",
    movie_id: movie_id,
    user: user,
  });
});

/* Export router to app.js */
module.exports = router;
