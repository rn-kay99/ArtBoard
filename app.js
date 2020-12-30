const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const dotenv = require("dotenv");
const passport = require("passport");
const cookieSession = require('cookie-session');

// Load config
dotenv.config();

//passport setup
const passportSetup = require("./config/passport");

const app = express();
const port = process.env.PORT || 8080;

// Handlebars Helper
const { formatDate } = require("./helpers/hbs")

// Handlebars
app.engine("hbs", handlebars({ helpers: {formatDate}, extname: "hbs" }));
app.set('view engine', 'hbs');

// set up session cookies
app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['keyboard cat']
}));

// Passport middleware
app.use(passport.initialize())
app.use(passport.session())

// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));
app.use("/auth", require("./routes/auth"));

app.listen(port);