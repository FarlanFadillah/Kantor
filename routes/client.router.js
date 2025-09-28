const {addClient, renderClientFormPage, renderClientListPage} = require("../controllers/clients.controller");
const router = require('express').Router();
const {clientFormValidator} = require('../middlewares/validator.middleware');

router.route('/form')
        .get(renderClientFormPage)

router.get('/list', renderClientListPage);

router.post('/form/new', ...clientFormValidator, addClient);

module.exports = router;