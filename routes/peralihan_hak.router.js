const { renderForm } = require('../controllers/peralihan_hak.controller');
const { getFormState } = require('../middlewares/form.middleware');

const router = require('express').Router();

router.route('/form')
        .get(getFormState, renderForm);


module.exports = router;