const {addClient, renderClientFormPage, renderClientListPage, renderClientViewPage, updateClient, deleteClient} = require("../controllers/clients.controller");
const router = require('express').Router();
const {clientFormValidator, validatorErrorHandler} = require('../middlewares/validator.middleware');
const {saveFormState, getFormState, clearFormState} = require("../middlewares/form.middleware");
const {formErrorHandler} = require("../middlewares/error.middleware");
const { pagination } = require("../middlewares/pagination.middleware");

router.route('/form')
        .get(getFormState, clearFormState, renderClientFormPage)

router.route('/list')
        .get(pagination, renderClientListPage);

router.get('/view', renderClientViewPage);

router.post('/form/new', ...clientFormValidator, saveFormState, validatorErrorHandler, clearFormState, addClient, formErrorHandler);

router.route('/edit')
    .post(...clientFormValidator, saveFormState, validatorErrorHandler, clearFormState, updateClient, formErrorHandler);

router.route('/delete')
    .post(deleteClient);

router.use(formErrorHandler);

module.exports = router;