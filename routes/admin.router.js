const { renderDashboardPage } = require('../controllers/admin.controller');
const { authentication } = require('../middlewares/auth.middleware');
const {renderBpthbViewPage} = require("../controllers/bphtb.controller");

const router = require('express').Router();

router.route('/dashboard')
        .get(renderDashboardPage);

router.route('/bphtb/view')
    .get(renderBpthbViewPage);


module.exports = router;