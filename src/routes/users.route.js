const {Router} = require('express');
const router = Router();

const {edit, remove} = require('../controllers/users.controller');

router.post('/api/users/edit/:id', edit);
router.post('/api/users/delete/:id', remove);

module.exports = router;