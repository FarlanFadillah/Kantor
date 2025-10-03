const { renderDashboardPage } = require('../controllers/admin.controller');

const router = require('express').Router();

router.route('/dashboard')
        .get(renderDashboardPage);

module.exports = router;