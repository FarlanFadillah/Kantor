const {verifyClientsNik} = require("../../controllers/api/clients_api.controller");
const router = require("express").Router();

router.route('/nik_verify')
    .get(verifyClientsNik);

module.exports = router;