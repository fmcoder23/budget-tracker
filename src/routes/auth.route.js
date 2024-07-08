const {Router} = require('express');
const router = Router();
const {login, register, logout} = require('../controllers/auth.controller');

router.post('/api/auth/login', login);
router.post('/api/auth/register', register);
router.get('/api/auth/logout', logout);

module.exports = router;