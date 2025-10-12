const { renderPbbFormPage, renderPbbListPage, addPbb, renderPbbViewPage, updatePbb } = require('../controllers/pbb.controller');
const { getFormState } = require('../middlewares/form.middleware');
const { pagination } = require('../middlewares/pagination.middleware');

const router = require('express').Router();



router.route('/form')
    .get(getFormState, renderPbbFormPage);

router.route('/form/new')
        .post(addPbb);

router.route('/form/edit')
        .post(updatePbb);

router.get('/view', renderPbbViewPage);

router.get('/list', pagination, renderPbbListPage);

module.exports = router;