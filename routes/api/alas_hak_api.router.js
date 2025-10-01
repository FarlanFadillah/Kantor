const {getAlasHak} = require("../../controllers/api/alas_hak_api.controller");
const router = require('express').Router();

router.get('/verify', getAlasHak);

module.exports = router;