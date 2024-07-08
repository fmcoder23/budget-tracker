const cookie = require('cookie-parser');
const fileUpload = require('express-fileupload');
const { homePage, registerPage, loginPage, usersPage } = require('./pages');
const budgetsRoute = require('../routes/budgets.route');
const isAuth = require('../middlewares/is-auth.middleware');
const isAdmin = require('../middlewares/is-admin.middleware');
const authRoute = require('../routes/auth.route');
const usersRoute = require('../routes/users.route');

const modules = async (app, express) => {
    app.use(fileUpload());
    app.use(cookie());
    app.set("view engine", "ejs");
    app.use(express.static(`${process.cwd()}/uploads`));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.json());

    // Pages and Routes
    app.get('/', isAuth, homePage);
    app.post('/api/budgets/create', isAuth, budgetsRoute);
    app.post('/api/budgets/edit/:id', isAuth, budgetsRoute);
    app.post('/api/budgets/delete/:id', isAuth, budgetsRoute);
    app.post('/api/auth/login', authRoute);
    app.post('/api/auth/register', authRoute);
    app.get('/api/auth/logout', authRoute);
    app.get('/register', registerPage);
    app.get('/login', loginPage);
    app.get('/users/:token', isAdmin, usersPage);
    app.post('/api/users/edit/:id', usersRoute);
    app.post('/api/users/delete/:id', usersRoute);
}

module.exports = modules;