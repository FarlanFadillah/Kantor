const { renderAlihHakForm, addAlihHak, 
        renderAlihHakListPage, addPihakPenerima, 
        addPihakPersetujuan, addKuasaPemberi, addKuasaPenerima, 
        renderAlihHakViewPage, 
        updateAlihHak } = require('../controllers/alih_hak.controller');
const { formErrorHandler } = require('../middlewares/error.middleware');
const { getFormState, saveFormState, clearFormState } = require('../middlewares/form.middleware');
const { pagination } = require('../middlewares/pagination.middleware');
const { alihHakValidator, validatorErrorHandler } = require('../middlewares/validator.middleware');

const router = require('express').Router();

router.route('/form')
        .get(getFormState, renderAlihHakForm);

router.route('/form/new')
        .post(...alihHakValidator, saveFormState, 
                validatorErrorHandler, clearFormState,
                addAlihHak, addPihakPenerima, 
                addPihakPersetujuan, addKuasaPemberi, 
                addKuasaPenerima, formErrorHandler);

router.route('/form/edit')
                .post(...alihHakValidator, saveFormState, 
                validatorErrorHandler, clearFormState,
                updateAlihHak, addPihakPenerima, 
                addPihakPersetujuan, addKuasaPemberi, 
                addKuasaPenerima, formErrorHandler);

router.get('/list', pagination, renderAlihHakListPage);
router.get('/view', renderAlihHakViewPage);


module.exports = router;