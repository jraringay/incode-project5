// Sample app.js - To be changed

/* Call required packages */
const express = require("express");
const morgan = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
// const bcrypt = require('bcrypt') // password hashing
// const session = require('express-session')

/* Set up application and app port */
const app = express();
const PORT = 3000;

/* Dev use functions */
app.use(morgan("dev")); // to monitor http requests in console
app.use(
  express.urlencoded({
    extended: true,
  })
); // for parsing app/x-www-form-urlencoded, instead of body-parser

/* Express Layout set and use functions */
app.set("view engine", "ejs");
app.use("/static", express.static(path.join(__dirname, "public"))); // Used to call media and css files stored in the 'public' folder
app.use(expressLayouts);
app.set("layout", "./layouts/full-width"); // Changed laypout to full-width one

/* Call database */
// const db = require('./db')

/* Router Setup */

/* Index - Home */
const indexRouter = require("./routes/index");
app.use("/routes/index", indexRouter);

/* Signup - signup route */
const signupRouter = require("./routes/signup");
app.use("/routes/signup", signupRouter);

/* Run App */
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.use("/", indexRouter);
app.use("/", signupRouter);
