const express = require("express");
const router = express.Router();
const { db, getDataFromCollection } = require("../config/db")


// @desc homepage
// @route GET /
router.get("/", (req, res) => {
    res.render("home");
});

// @desc Dashboard
// @route GET /dashboard
router.get("/dashboard", async (req, res) => {
    const collection = db.collection('paintings');
    const snapshot = await collection.get();
    let paintings = [];
    snapshot.forEach(doc => {
        let data = doc.data();
        data.id = doc.id;
        paintings.push(data);
    });

    res.render("dashboard", {
        paintings: paintings
    });
})

// @desc Show all pictures
// @routes GET /paintings
router.get("/paintings", async (req, res) => {
    const collection = db.collection('paintings');
    const snapshot = await collection.get();
    let paintings = [];
    snapshot.forEach(doc => {
        let data = doc.data();
        data.id = doc.id;
        paintings.push(data);
    });

    res.render("paintings", {
        paintings: paintings
    });
})

// @desc Show user picture
// @route GET /
router.get("/painting/:id", async (req, res) => {
    const pictureId = req.params.id;

    // Load the picture to id
    const collection = db.collection('paintings');
    await collection.doc(pictureId)
        .get()
        .then((doc) => {
            let painting = doc.data();
            painting.id = doc.id;
            res.render("paintings/show-painting", {
                painting: painting
            });
        })
        .catch((error) => {
            console.log(error);
        });
});


module.exports = router;