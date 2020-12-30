const express = require("express");
const router = express.Router();
const paintingController = require("../controllers/paintingController");
const { authCheck } = require("../middleware/auth");

// @desc homepage
// @route GET /
router.get("/", paintingController.painting_random_get);

// @desc Dashboard
// @route GET /dashboard
router.get("/dashboard", authCheck, paintingController.painting_user_get);

// @desc Show all paintings
// @routes GET /paintings
router.get("/paintings", paintingController.painting_index)

// @desc Show single painting
// @route GET /painting/:id
router.get("/painting/:id", paintingController.painting_details);

// @desc Edit single painting
// @route GET /painting/edit/:id
router.get("/painting/edit/:id", (req, res) => {
    res.render("paintings/edit")
});

// @desc Show add painting page
// @route GET /painting/add
router.get("/paintings/add", (req, res) => {
    res.render("paintings/add")
});

module.exports = router;