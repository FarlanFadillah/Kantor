const {getAlasHak, searchAlasHak} = require("../../controllers/api/alas_hak_api.controller");
const router = require('express').Router();

router.get('/verify', getAlasHak);
router.get('/search', searchAlasHak);


router.use((err, req, res, next)=>{
    res.status(err.status).json({success : false, msg : err.message})
})

module.exports = router;