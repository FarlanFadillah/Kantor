const {verifyClientsNik, searchClient} = require("../../controllers/api/clients_api.controller");
const router = require("express").Router();

router.route('/nik_verify')
    .get(verifyClientsNik);

router.get('/search', searchClient);

module.exports = router;