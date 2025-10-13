const { renderPbbFormPage, renderPbbListPage, addPbb, renderPbbViewPage, updatePbb, deletePbb } = require('../controllers/pbb.controller');
const { formErrorHandler } = require('../middlewares/error.middleware');
const { getFormState, saveFormState, clearFormState } = require('../middlewares/form.middleware');
const { pagination } = require('../middlewares/pagination.middleware');
const { pbbValidator, validatorErrorHandler } = require('../middlewares/validator.middleware');

const router = require('express').Router();



router.route('/form')
    .get(getFormState, renderPbbFormPage);

router.route('/form/new')
        .post(...pbbValidator, saveFormState, validatorErrorHandler, clearFormState, addPbb);

router.route('/form/edit')
        .post(...pbbValidator, saveFormState, validatorErrorHandler, clearFormState, updatePbb);

router.get('/view', renderPbbViewPage);

router.get('/list', pagination, renderPbbListPage);

router.post('/delete', deletePbb);

router.use(formErrorHandler);

module.exports = router;