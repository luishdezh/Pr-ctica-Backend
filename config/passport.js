const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const fs = require("fs");
let usersjson = fs.readFileSync('./data/users.json','utf-8');
let users = JSON.parse(usersjson);

function extractProfile (profile) {
    const googleId = profile.id;

    if(users.find(user => user.googleId == googleId)) {
        console.log('Si existe usario');
    } else {
        console.log('No existe usario');
        let imageUrl = '';
        if (profile.emails && profile.emails.length) {
            email = profile.emails[0].value;
        }
        if (profile.photos && profile.photos.length) {
        imageUrl = profile.photos[0].value;
        }
        const idTimestamp = new Date().getTime();
        users.push({
            idTimestamp,
            googleId,
            email,
            imageUrl
        });
        usersjson = JSON.stringify(users);
        fs.writeFileSync("./data/users.json",usersjson,"utf-8");
    }
}

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.CLIENT_ID,
            clientSecret: process.env.CLIENT_SECRET,
            callbackURL: 'http://localhost:3000/auth/google/callback',
        },
        function (accessToken, refreshToken, profile, done) {
            console.log('working');
            done(null, extractProfile(profile));
        }
    )
)

passport.serializeUser(function (user, done) {
    done(null,user._id);
});

passport.deserializeUser(function (_id, done) {
    const user = users.find(_id)
    .then(user => done(null, user));
});