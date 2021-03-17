// Call required package modules
const express = require("express");
const router = express.Router();
const session = require("express-session");

// Set up application
const app = express();

//sessions to track users
app.use(
  session({
    resave: false,
    secret: "shh/its1asecret",
    saveUninitialized: false,
  })
);

//Route definition for home page
router.get("/", (req, res) => {
  const user = req.user;
  res.render("pages/index", {
    title: "Home Page",
    user: user,
  });
});

// Export router to app.js 
module.exports = router;
