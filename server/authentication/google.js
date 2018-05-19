const passport = require('passport');
const passportGoogle = require('passport-google-oauth');

const { User } = require('../models/User');


const passportConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:5000/google/redirect"
};

if (passportConfig.clientID) {
    passport.use(new passportGoogle.OAuth2Strategy(passportConfig,  function (request, accessToken, refreshToken, profile, done) {
        
        User.findOne({ google: profile.id })
            .then(doc => {
                if (!doc) {
                    const newUser = new User({
                        google: profile.id,
                        username: profile.displayName,
                        email: profile.emails[0].value,
                        profilePic: profile.photos[0].value,
                        gender: profile.gender
                    });
                    return newUser.save();
                }
                return doc;
            })
            .then(user => {
                done(null, user);
            })
            .catch(e => {
                console.log(e);
            });
    }));
}