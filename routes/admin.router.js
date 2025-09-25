const { renderDashboardPage } = require('../controllers/admin.controller');
const { authentication } = require('../middlewares/auth.middleware');

const router = require('express').Router();

router.route('/dashboard')
        .get(renderDashboardPage);


module.exports = router;