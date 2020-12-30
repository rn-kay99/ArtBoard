const db = require("../config/db");

class User {
    constructor(userId, firstName, lastName, displayName, image, accountType) {
        this.userId = userId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.displayName = displayName;
        this.image = image;
        this.accountType = accountType;
    }

    async create() {
        db.collection("users").doc(this.userId).set({
            userId: this.userId,
            firstName: this.firstName,
            lastName: this.lastName,
            displayName: this.displayName,
            image: this.image,
            accountType: this.accountType
        });

        let user = await findUser(this.userId);

        return user.data();
    }
}

async function findUser(id) {
    const user = db.collection("users").doc(id);
    const doc = await user.get();

    if (doc.exists) {
        return doc.data();
    }
    return null;
}

module.exports = {
    User: User,
    findUser: findUser
};