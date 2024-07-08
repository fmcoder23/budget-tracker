require('dotenv/config');

const config = {
    port: process.env.PORT || 4000,
    jwtSecretKey: process.env.JWT_SECRET_KEY,
    jwtExpiration: process.env.JWT_EXPIRATION,
}

module.exports = config;