const { verifyPbb } = require('../../controllers/api/pbb_api.controller');

const router =  require('express').Router();

router.get('/verify', verifyPbb);


module.exports = router;