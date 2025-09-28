const router = require('express').Router();
const {renderLoginPage, login, register, renderRegisterPage, logout} = require('../controllers/auth.controller');
const { errorAuthentication } = require('../middlewares/error.middleware');
const { loginValidator, accountProfileValidator, passwordValidator, validatorErrorHandler } = require('../middlewares/validator.middleware');
const {loginLimiter} = require("../middlewares/ratelimiter.middleware");

router.route('/login')
        .get(renderLoginPage)
        .post(loginLimiter, ...loginValidator, validatorErrorHandler, login);

router.route('/register')
        .get(renderRegisterPage)
        .post(register);

router.post('/logout', logout);

router.use(errorAuthentication);

module.exports = router;