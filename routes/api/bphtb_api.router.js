const { searchBphtb } = require('../../controllers/api/bphtb_api.controller');

const router = require('express').Router();

router.get('/search', searchBphtb);

module.exports = router;