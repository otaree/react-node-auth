const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const { User } = require('../models/User');

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme("jwt"),
    secretOrKey: process.env.TOKEN_SECRET,
    issuer: process.env.TOKEN_ISSUER,
    audience: process.env.TOKEN_AUDIENCE
};

passport.use(new JwtStrategy(jwtOptions, (payload, done) => {
    User.findById(payload.sub)
        .then(user => {
            if (user) {
                console.log("payload", payload);
                console.log("user", user);
                return done(null, user, payload);
            }
            return done();
        })
        .catch(e => {
            console.log(e);
        });
}));