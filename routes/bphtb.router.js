const {renderBphtbFormPage, addBphtb, updateBphtb, deleteBphtb} = require("../controllers/bphtb.controller");
const router = require('express').Router();


router.route('/form')
        .get(renderBphtbFormPage)

router.post('/form/new', addBphtb);

router.post('/form/edit', updateBphtb);

router.post('/form/delete', deleteBphtb);



module.exports = router;