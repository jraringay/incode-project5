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

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
}

/* Route definition */
router.get("/", (req, res) => {
  let id = req.query["id"];
  const user = req.user;
  console.log(`what is our lovely ${id}`);
  res.render("pages/movie", {
    title: "Movie",
    id: id,
    user: user,
  });
});

/* Export router to app.js */
module.exports = router;
