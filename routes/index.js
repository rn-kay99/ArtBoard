const express = require("express");
const router = express.Router();

// @desc homepage
// @route GET /
router.get("/", (req, res) => {
    res.render("home");
});

router.get("/dashboard", (req, res) => {
    let name = "kay";
    res.render("dashboard", {
        name: name
    });
})
router.get("/paintings", (req, res) => {
    res.render("paintings")
})

module.exports = router;