const express = require("express");
const router = express.Router();
const { db, getDataFromCollection } = require("../config/db")


// @desc homepage
// @route GET /
router.get("/", (req, res) => {
    res.render("home");
});

router.get("/dashboard", async (req, res) => {
    const collection = db.collection('paintings');
    const snapshot = await collection.get();
    let paintings = [];
    snapshot.forEach(doc => {
        let data = doc.data();
        data.id = doc.id;
        paintings.push(data);
    });
    console.log(paintings);

    res.render("dashboard", {
        paintings: paintings
    });
})
router.get("/paintings", (req, res) => {
    res.render("paintings")
})

module.exports = router;