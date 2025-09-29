const {addClient, renderClientFormPage, renderClientListPage, renderClientViewPage, updateClient} = require("../controllers/clients.controller");
const router = require('express').Router();
const {clientFormValidator, validatorErrorHandler} = require('../middlewares/validator.middleware');
const {saveFormState} = require("../middlewares/form.middleware");
const {formErrorHandler} = require("../middlewares/error.middleware");

router.route('/form')
        .get(renderClientFormPage)

router.get('/list', renderClientListPage);

router.post('/form/new', ...clientFormValidator, validatorErrorHandler, saveFormState, addClient, formErrorHandler);

router.get('/view', renderClientViewPage);

router.route('/edit')
    .get(renderClientFormPage)
    .post(...clientFormValidator, validatorErrorHandler, saveFormState, updateClient, formErrorHandler);

module.exports = router;