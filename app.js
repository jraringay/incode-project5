// Sample app.js - To be changed

/* Call required packages */
const express = require("express");
const morgan = require("morgan");
const expressLayouts = require("express-ejs-layouts");
const path = require("path");
const bcrypt = require("bcrypt"); // password hashing
const session = require("express-session");
const flash = require("express-flash");
const passport = require("passport");
const initializePassport = require("./passportConfig");
initializePassport(passport);

/* Set up application and app port */
const app = express();

//Pack for reading environmental variables
const dotenv = require("dotenv");
dotenv.config();
const API_KEI = process.env.API_KEI;

//const PORT = pocess.env.PORT
const PORT = process.env.PORT;

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
/* Dev use functions */
app.use(morgan("dev")); // to monitor http requests in console
app.use(
  express.urlencoded({
    extended: true,
  })
); // for parsing app/x-www-form-urlencoded, instead of body-parser

//Design, set up view engine
app.set("view engine", "ejs");
app.use("/static", express.static(path.join(__dirname, "public")));
app.use(expressLayouts);
app.set("layout", "./layouts/full-width");

app.use(flash());

// Changed laypout to full-width one

// /* Call database */
const database = require("./database.js");

/* Router Setup */

/* Index - Home */
const indexRouter = require("./routes/index");
app.use("/routes/index", indexRouter);

/* Signup - signup route */
const signupRouter = require("./routes/signup");
app.use("/routes/signup", signupRouter);

/* Login */
const loginRouter = require("./routes/login");
app.use("/routes/login", loginRouter);

/* Dashboard */
const dashboardRouter = require("./routes/dashboard");
app.use("/routes/dashboard", dashboardRouter);

/* Logout */
const logoutRouter = require("./routes/logout");
app.use("/routes/logout", logoutRouter);

/* Run App */
app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});

app.use("/", indexRouter);
app.use("/signup", signupRouter);
app.use("/login", loginRouter);
app.use("/dashboard", dashboardRouter);
app.use("/logout", logoutRouter);
