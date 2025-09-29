const {addClient, renderClientFormPage, renderClientListPage, renderClientViewPage, updateClient} = require("../controllers/clients.controller");
const router = require('express').Router();
const {clientFormValidator, validatorErrorHandler} = require('../middlewares/validator.middleware');
const {saveFormState, getFormState} = require("../middlewares/form.middleware");
const {formErrorHandler} = require("../middlewares/error.middleware");

router.route('/form')
        .get(getFormState, renderClientFormPage)

router.get('/list', renderClientListPage);

router.post('/form/new', ...clientFormValidator, saveFormState, validatorErrorHandler, addClient, formErrorHandler);

router.get('/view', renderClientViewPage);

router.route('/edit')
    .get(getFormState, renderClientFormPage)
    .post(...clientFormValidator, saveFormState, validatorErrorHandler, updateClient, formErrorHandler);

module.exports = router;