/* Recycled router for home page */

/* Call required package modules */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const session = require("express-session");
/* Call database */
const database = require("../database.js");
// const { Pool } = require("pg");

/* Route definition */
router.get("/", (req, res) => {
  res.render("pages/signup", {
    title: "Signup Page",
  });
});

router.post("/", async (req, res) => {
  let { firstname, secondname, password, password2, email } = req.body;
  console.log(firstname, secondname, password, password2, email);
  let errors = [];
  if (!firstname || !secondname || !email || !password || !password2) {
    errors.push({ message: "Please enter all fields" });
  }
  if (password.length < 6) {
    errors.push({ message: "Password should be at least 6 characters" });
  }
  if (password != password2) {
    errors.push({ message: "Passwords do not match" });
  }
  if (errors.length > 0) {
    console.log(errors);
    res.render("pages/signup", { errors, title: "Sign up page" });
  } else {
    //FORM VALIDATION HAS PASSED

    let hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);
    const emailQuery =
      "SELECT email FROM users WHERE email = '" + req.body.email + "';";
    database.query(emailQuery, [email], (err, results) => {
      if (err) {
        throw err;
      }
      console.log(results.rows);
    });
  }
});
/* Export router to app.js */
module.exports = router;
