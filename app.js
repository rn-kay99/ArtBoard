const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const dotenv = require("dotenv");

// Load config
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Handlebars Helper
const { formatDate } = require("./helpers/hbs")

// Handlebars
app.engine("hbs", handlebars({ helpers: {formatDate}, extname: "hbs" }));
app.set('view engine', 'hbs');


// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));

app.listen(port);