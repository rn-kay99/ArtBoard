const db = require("../config/db");

// get all paintings
const painting_index = async (req, res) => {
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
};

// get a single painting
const painting_details = async (req, res) => {
    const collection = db.collection('paintings');
    await collection.doc(req.params.id)
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
};

// get all pictures from a user
const painting_user_get = async (req, res) => {
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
};

module.exports = {
    painting_index,
    painting_details,
    painting_user_get
}