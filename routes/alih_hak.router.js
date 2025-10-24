const { renderAlihHakForm, addAlihHak, 
        renderAlihHakListPage, 
        renderAlihHakViewPage, 
        updateAlihHak, 
        deleteAlihHak} = require('../controllers/alih_hak.controller');
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
                addAlihHak, formErrorHandler);

router.route('/form/edit')
                .post(...alihHakValidator, saveFormState, 
                validatorErrorHandler, clearFormState,
                updateAlihHak, formErrorHandler);

router.post('/delete', deleteAlihHak);

router.get('/list', pagination, renderAlihHakListPage);
router.get('/view', renderAlihHakViewPage);


module.exports = router;