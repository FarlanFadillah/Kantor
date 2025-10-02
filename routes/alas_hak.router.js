const { renderAlasHakForm, addAlasHak, renderAlasHakViewPage, renderAlasHakListPage, updateAlasHak, addAlasHakOwner,
    updateAlasHakOwner
} = require('../controllers/alas_hak.controller');
const { getAlasHakOwner } = require('../middlewares/alas_hak.middleware');
const { getFormState, saveFormState, clearFormState } = require('../middlewares/form.middleware');
const { pagination } = require('../middlewares/pagination.middleware');
const { alasHakFormValidator, validatorErrorHandler } = require('../middlewares/validator.middleware');

const router = require('express').Router();


router.route('/form')
    .get(getFormState, renderAlasHakForm);

router.post('/form/new',
    ...alasHakFormValidator, saveFormState,
    validatorErrorHandler, clearFormState,
    addAlasHak, addAlasHakOwner);
router.post('/form/edit',
    ...alasHakFormValidator, saveFormState,
    validatorErrorHandler, clearFormState,
    updateAlasHak, updateAlasHakOwner);

router.route('/view') 
        .get(getAlasHakOwner, renderAlasHakViewPage);


router.route('/list')
        .get(pagination, renderAlasHakListPage);
    

module.exports = router;