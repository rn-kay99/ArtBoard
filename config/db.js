// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
const firebase = require("firebase/app");

// Add the Firebase products that you want to use
require("firebase/auth");
require("firebase/firestore");


// TODO: Replace the following with your app's Firebase project configuration
// For Firebase JavaScript SDK v7.20.0 and later, `measurementId` is an optional field
let firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: "art-board-4686a.firebaseapp.com",
    projectId: "art-board-4686a",
    storageBucket: "art-board-4686a.appspot.com",
    messagingSenderId: "997021049585",
    appId: "1:997021049585:web:9369323c0e25f0ea997f50",
    measurementId: "G-HGSGJC4KFZ",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

async function getDataFromCollection(collection) {
    let collections = await db.collection(collection).get();
    let docs = collections.docs;
    let data = [];
    docs.forEach((doc) => {
        data.push(doc.data());
    });

    return data;
}

module.exports = db;