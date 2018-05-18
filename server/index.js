require('./config/config');
const express = require('express');
const passport = require('passport');

const { generateAccessToken } = require('./middleware/token');
const { mongoose } = require('./db/mongoose');
require('./authentication/jwt');
require('./authentication/google');

// Generate the Token for the user authenticated in the request 
const generateUserToken = (req, res) => {
    const accessToken = generateAccessToken(req.user._id);
    res.send({
        token: accessToken
    });
};

const port = process.env.PORT || 5000;

const app = express();

app.use(passport.initialize());

app.get('/google', passport.authenticate('google', { session: false, scope: ['openid', 'profile', 'email'] }));

app.get('/google/redirect', passport.authenticate('google', { session: false }), generateUserToken);

app.get('/user', passport.authenticate(['jwt'], { session: false }), (req, res) => {
    res.send(req.user);
});

app.get('*', (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Server is up at ${port}`);
});
