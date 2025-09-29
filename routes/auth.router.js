const router = require('express').Router();
const {renderLoginPage, login, register, renderRegisterPage, logout} = require('../controllers/auth.controller');
const { formErrorHandler } = require('../middlewares/error.middleware');
const { loginValidator, accountProfileValidator, passwordValidator, validatorErrorHandler } = require('../middlewares/validator.middleware');
const {loginLimiter} = require("../middlewares/ratelimiter.middleware");
const {saveFormState} = require('../middlewares/form.middleware')

router.route('/login')
        .get(renderLoginPage)
        .post(loginLimiter, ...loginValidator, validatorErrorHandler, saveFormState, login);

router.route('/register')
        .get(renderRegisterPage)
        .post(...accountProfileValidator, ...passwordValidator, validatorErrorHandler, saveFormState, register);

router.post('/logout', logout);

router.use(formErrorHandler);

module.exports = router;