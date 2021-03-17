// Call required package modules 
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const session = require("express-session");
const flash = require("express-flash");

// Call database 
const { pool } = require("../database.js");

// Set up application 
const app = express();

//Confirmation email package
const nodemailer = require("nodemailer");

//sessions to track user
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

// Route definition for signup
router.get("/", checkAuthenticated, (req, res) => {
  const user = req.user;
  res.render("pages/signup", {
    title: "Signup Page",
    user: user,
  });
});

//Post new user data
router.post("/", async (req, res) => {

  //Set up variables to store inout data
  let { firstname, secondname, password, password2, email } = req.body;
  let errors = [];

  //Set up form validation and requirements
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
    res.render("pages/signup", { errors, title: "Sign up page" });
  } else {
    let hashedPassword = await bcrypt.hash(password, 10);
    console.log(hashedPassword);

    // Validation passed
    pool.query(
      `SELECT * FROM users
          WHERE email = $1`,
      [email],
      (err, results) => {
        if (err) {
        }
        if (results.rows.length > 0) {
          errors.push({ message: "Email already registered" });
          res.render("pages/signup", { errors, title: "Sign up page" });
        } else {
          userActive = false;
          pool.query(
            `INSERT INTO users (firstname, secondname, password, email, active) VALUES ($1, $2, $3, $4, $5)
            RETURNING user_id, password`,
            [firstname, secondname, hashedPassword, email, userActive],
            (err, results) => {
              if (err) {
                throw err;
              }
              // Genereate hash for email confirmation link and save it in database
              const emailConfHash = crypto.randomBytes(30).toString("hex");
              pool
                .query(
                  "INSERT INTO email_confirmation (email, hash) values ($1, $2);",
                  [email, emailConfHash]
                )
                .then(() => {
                  const transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false,
                    requireTLS: true,
                    auth: {
                      user: process.env.GMAIL_USERNAME,
                      pass: process.env.GMAIL_PASSWORD,
                    },
                  });
                  const mailOptions = {
                    from: '"Movies" <jane.kotovich.test@gmail.com>',
                    to: `${email}`,
                    subject: "Please confirm your email address",
                    html: `
              <h3>Thank you for creating your account </h3>
              <p>Please confirm your email address:</p>
              <a href="http://localhost:3000/email/${emailConfHash}">http://$localhost:3000/email/${emailConfHash}</a>
              `,
                  };
                  transporter.sendMail(mailOptions, (err, info) => {
                    if (err) {
                      res.render("pages/error", {
                        err: err,
                        title: "Error | Movie database",
                        current_user: req.session.user,
                      });
                    } else {
                      // Redirect back to signup page with modal opened
                      req.flash(
                        "success_msg",
                        "You are now registered. Please confirm your email and log in!"
                      );
                      res.redirect("/login");
                    }
                  });
                });
            }
          );
        }
      }
    );
  }
});

/* Export router to app.js */
module.exports = router;
