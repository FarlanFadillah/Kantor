const { verifyPbb, searchPbb } = require('../../controllers/api/pbb_api.controller');

const router =  require('express').Router();

router.get('/verify', verifyPbb);
router.get('/search', searchPbb);


module.exports = router;