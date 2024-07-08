const {sign, verify} = require('jsonwebtoken');
const config = require('../../config');

const createToken = (payload) => sign(payload, config.jwtSecretKey, {expiresIn: config.jwtExpiration});

const checkToken = (token, callback) => verify(token, config.jwtSecretKey, callback);

module.exports = {
    createToken,
    checkToken,
}