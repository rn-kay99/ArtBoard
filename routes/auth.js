const express = require("express"); 
const router = express.Router();
const passport = require("passport");


// @desc Logout
// @route GET /auth/logout
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
})

// @desc Auth with google
// @route GET /auth/google
router.get("/google", passport.authenticate('google', { scope: ['profile'] }));

// @desc Callback
// @route GET /auth/google/callback
router.get("/google/callback", passport.authenticate("google"), (req, res)  => {
    res.redirect("/dashboard");
})

module.exports = router;
