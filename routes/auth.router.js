const router = require('express').Router();
const {renderLoginPage, login, register, renderRegisterPage, logout} = require('../controllers/auth.controller');
const { formErrorHandler } = require('../middlewares/error.middleware');
const { loginValidator, accountProfileValidator, passwordValidator, validatorErrorHandler } = require('../middlewares/validator.middleware');
const {loginLimiter} = require("../middlewares/ratelimiter.middleware");
const {saveFormState, getFormState, clearFormState} = require('../middlewares/form.middleware')
const {authentication} = require("../middlewares/auth.middleware");

router.route('/login')
        .get(getFormState, renderLoginPage)
        .post(loginLimiter, ...loginValidator, saveFormState, validatorErrorHandler, clearFormState, login);

router.use('/register', authentication);
router.route('/register')
        .get(getFormState, renderRegisterPage)
        .post(...accountProfileValidator, ...passwordValidator, saveFormState, validatorErrorHandler, clearFormState, register);

router.post('/logout', logout);

router.use(formErrorHandler);

module.exports = router;