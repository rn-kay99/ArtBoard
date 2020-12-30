const db = require("../config/db");

// get random painting
const painting_random_get = async (req, res) => {
    const collection = db.collection('paintings');
    const snapshot = await collection.get();
    let paintings = [];
    snapshot.forEach(doc => {
        let data = doc.data();
        data.id = doc.id;
        paintings.push(data);
    });
    let randomPainting = paintings[Math.floor(Math.random() * paintings.length)];
    randomPainting.user
        .get()
        .then((doc) => {
            randomPainting.user = doc.data();

            res.render("home", {
                paintings: randomPainting,
                user: req.user
            });
        })
        .catch((error) => {
            console.log(error);
        });
};

// get all paintings
const painting_index = async (req, res) => {
    try {
        let paintings = [];
        const collection = db.collection('paintings');
        const snapshot = await collection.get();
        snapshot.forEach(async (doc) => {
            let painting = doc.data();

            painting.id = doc.id;
            paintings.push(painting);
        });

        for (const painting of paintings) {
            const userSnapshot = await painting.user.get();
            let user = userSnapshot.data();
            painting.user = user;
        }

        res.render("paintings", {
            paintings,
            user: req.user
        });
    }
    catch (error) {
        console.log(error)
    }
};

// get a single painting
const painting_details = async (req, res) => {
    const collection = db.collection('paintings');
    await collection.doc(req.params.id)
        .get()
        .then((doc) => {
            let painting = doc.data();
            painting.id = doc.id;
            painting.user
                .get()
                .then((doc) => {
                    painting.user = doc.data();

                    res.render("paintings/show-painting", {
                        painting: painting,
                        user: req.user
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
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
        paintings: paintings,
        user: req.user
    });
};

module.exports = {
    painting_random_get,
    painting_index,
    painting_details,
    painting_user_get
}