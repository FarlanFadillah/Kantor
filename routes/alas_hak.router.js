const { renderAlasHakForm, addAlasHak, renderAlasHakViewPage, renderAlasHakListPage, updateAlasHak, addAlasHakOwner,
    updateAlasHakOwner, deleteAlasHak
} = require('../controllers/alas_hak.controller');
const { getFormState, saveFormState, clearFormState } = require('../middlewares/form.middleware');
const { pagination } = require('../middlewares/pagination.middleware');
const { alasHakFormValidator, validatorErrorHandler } = require('../middlewares/validator.middleware');
const {formErrorHandler} = require("../middlewares/error.middleware");

const router = require('express').Router();


router.route('/form')
    .get(getFormState, renderAlasHakForm);

router.post('/form/new',
    ...alasHakFormValidator, saveFormState,
    validatorErrorHandler, clearFormState,
    addAlasHak, addAlasHakOwner, formErrorHandler);
router.post('/form/edit',
    ...alasHakFormValidator, saveFormState,
    validatorErrorHandler, clearFormState,
    updateAlasHak, updateAlasHakOwner, formErrorHandler);

router.route('/view') 
        .get(renderAlasHakViewPage);


router.route('/list')
        .get(pagination, renderAlasHakListPage);

router.route('/delete')
        .post(deleteAlasHak);

module.exports = router;