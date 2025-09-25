const router = require('express').Router();
const {renderLoginPage, login, register, renderRegisterPage} = require('../controllers/auth.controller');
const { errorAuthentication } = require('../middlewares/auth.middleware');

router.route('/login')
        .get(renderLoginPage)
        .post(login);

router.route('/register')
        .get(renderRegisterPage)
        .post(register);

router.use(errorAuthentication);

module.exports = router;