const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const {User, findUser} = require("../models/User");

passport.serializeUser((user, done) => {
    done(null, user.userId)
})

passport.deserializeUser((id, done) => {
    findUser(id).then((user) => {
        done(null, user);
    })
})

passport.use(
    new GoogleStrategy({
        // options for google strategy
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/auth/google/callback"
    },
        async (accessToken, refreshToken, profile, done) => {
            // passport callback function
            let userId = profile.id;
            let fistName = profile.name.givenName;
            let lastName = profile.name.familyName;
            let displayName = profile.displayName;
            let image = profile.photos[0].value;
            let accountType = "google";
            let newUser = new User(userId, fistName, lastName, displayName, image, accountType);
            
            findUser(userId).then((user) => {
                if (user != null) {
                    done(null, user);
                }
                else {
                    newUser.create().then((user) => {
                        done(null, user);
                    });
                }
            });
        }
    )
)