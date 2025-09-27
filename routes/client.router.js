const {addClient, renderClientFormPage} = require("../controllers/clients.controller");
const router = require('express').Router();
const {clientFormValidator} = require('../middlewares/validator.middleware');

router.route('/form')
        .get(renderClientFormPage)

router.post('/form/new', ...clientFormValidator, addClient);

module.exports = router;