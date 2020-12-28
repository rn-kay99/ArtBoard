const express = require("express");
const handlebars = require("express-handlebars");
const path = require("path");
const dotenv = require("dotenv");
const {db, getDataFromCollection} = require("./config/db")

getDataFromCollection("test").then((docs) => {
    const data = docs;
    console.log(data);
});

// Load config
dotenv.config();

const app = express();
const port = process.env.PORT || 8080;

// Handlebars
app.engine("hbs", handlebars({extname: "hbs"}));
app.set('view engine', 'hbs');


// Static folder
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", require("./routes/index"));

app.listen(port);