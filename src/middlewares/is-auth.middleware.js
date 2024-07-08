const { checkToken } = require('../utils/jwt');

const isAuth = (req, res, next) => {
    if (!req.cookies.token) {
        return res.render('register');
    }

    checkToken(req.cookies.token, (err, data) => {
        if (err) return res.render('login');
        req.user = data;
        next();

    });

}

module.exports = isAuth;