const { checkToken } = require('../utils/jwt');

const isAdmin = (req, res, next) => {
    const {token} = req.params;

    if (!token) {
        return res.render('register');
    }

    checkToken(token, (err, data) => {
        if (err) return res.render('login');
        next();
    });

}

module.exports = isAdmin;