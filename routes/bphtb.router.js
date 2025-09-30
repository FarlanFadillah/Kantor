const {renderBphtbFormPage, addBphtb, updateBphtb, deleteBphtb} = require("../controllers/bphtb.controller");
const {bphtbFormValidator, validatorErrorHandler} = require('../middlewares/validator.middleware');
const {saveFormState, getFormState, clearFormState} = require('../middlewares/form.middleware');
const { formErrorHandler } = require("../middlewares/error.middleware");
const router = require('express').Router();


router.route('/form')
        .get(getFormState, renderBphtbFormPage)

router.post('/form/new', ...bphtbFormValidator, saveFormState, validatorErrorHandler, clearFormState, addBphtb, formErrorHandler);

router.post('/form/edit', ...bphtbFormValidator, saveFormState, updateBphtb, clearFormState, formErrorHandler);

router.post('/form/delete', deleteBphtb); 


module.exports = router;