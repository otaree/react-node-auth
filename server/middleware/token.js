const jwt = require('jsonwebtoken');

const generateAccessToken = userId => {
    const expiresIn = "1 hour";
    const audience = process.env.TOKEN_AUDIENCE;
    const issuer = process.env.TOKEN_ISSUER;
    const secret = process.env.TOKEN_SECRET;

    const token = jwt.sign({}, secret, {
        expiresIn,
        audience,
        issuer,
        subject: userId.toString()
    });

    return token;
};

module.exports = { generateAccessToken };