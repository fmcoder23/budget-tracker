const {Router} = require('express');
const router = Router();

const {create, edit, remove} = require('../controllers/budgets.controller');

router.post('/api/budgets/create', create);
router.post('/api/budgets/edit/:id', edit);
router.post('/api/budgets/delete/:id', remove);

module.exports = router;