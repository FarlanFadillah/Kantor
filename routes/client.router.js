const {addClient, renderClientFormPage, renderClientListPage, renderClientViewPage, updateClient} = require("../controllers/clients.controller");
const router = require('express').Router();
const {clientFormValidator} = require('../middlewares/validator.middleware');

router.route('/form')
        .get(renderClientFormPage)

router.get('/list', renderClientListPage);

router.post('/form/new', ...clientFormValidator, addClient);

router.get('/view', renderClientViewPage);

router.route('/edit')
    .get(renderClientFormPage)
    .post(updateClient);

module.exports = router;