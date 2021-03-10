/* Recycled router for home page */

/* Call required package modules */
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const session = require("express-session");
const flash = require("express-flash");
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
app.use(flash());

//check if user if already authenticated
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect("/dashboard");
  }
  next();
}

/* Route definition */
router.get("/", checkAuthenticated, (req, res) => {
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

    // Validation passed
    pool.query(
      `SELECT * FROM users
          WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
          console.log(err);
        }
        console.log("reaches here");
        console.log(results.rows);
        if (results.rows.length > 0) {
          errors.push({ message: "Email already registered" });
          res.render("pages/signup", { errors, title: "Sign up page" });
        } else {
          pool.query(
            `INSERT INTO users (firstname, secondname, password, email) VALUES ($1, $2, $3, $4)
            RETURNING user_id, password`,
            [firstname, secondname, hashedPassword, email],
            (err, results) => {
              if (err) {
                throw err;
              }
              console.log(results.rows);
              req.flash(
                "success_msg",
                "You are now registered. Please log in!"
              );
              res.redirect("/login");
            }
          );
        }
      }
    );
  }
});

/* Export router to app.js */
module.exports = router;
