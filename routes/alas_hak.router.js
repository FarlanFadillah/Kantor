const { renderAlasHakForm, addAlasHak, renderAlasHakViewPage, renderAlasHakListPage } = require('../controllers/alas_hak.controller');
const { getFormState, saveFormState, clearFormState } = require('../middlewares/form.middleware');
const { pagination } = require('../middlewares/pagination.middleware');
const { alasHakFormValidator, validatorErrorHandler } = require('../middlewares/validator.middleware');

const router = require('express').Router();


router.route('/form')
    .get(getFormState, renderAlasHakForm);

router.post('/form/new', ...alasHakFormValidator, saveFormState, validatorErrorHandler, clearFormState, addAlasHak);
// router.post('/form/edit', ...alasHakFormValidator, saveFormState, validatorErrorHandler, clearFormState, addAlasHak);

router.get('/view', renderAlasHakViewPage);


router.route('/list')
        .get(pagination, renderAlasHakListPage);
    

module.exports = router;