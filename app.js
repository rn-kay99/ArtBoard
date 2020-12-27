const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");

const app = express();

const port = 8080;

// Handlebars
app.engine("hbs", handlebars({extname: "hbs"}));
app.set('view engine', 'hbs');


// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));

app.listen(port);