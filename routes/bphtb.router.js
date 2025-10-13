const {renderBphtbFormPage, addBphtb, updateBphtb, deleteBphtb, renderBpthbViewPage} = require("../controllers/bphtb.controller");
const {bphtbFormValidator, validatorErrorHandler} = require('../middlewares/validator.middleware');
const {saveFormState, getFormState, clearFormState} = require('../middlewares/form.middleware');
const { formErrorHandler } = require("../middlewares/error.middleware");
const router = require('express').Router();


router.route('/form')
        .get(getFormState, renderBphtbFormPage)

router.post('/form/new', ...bphtbFormValidator, saveFormState, validatorErrorHandler, clearFormState, addBphtb, formErrorHandler);

router.post('/form/edit', ...bphtbFormValidator, saveFormState, validatorErrorHandler, clearFormState, updateBphtb, formErrorHandler);

router.post('/delete', deleteBphtb);

router.route('/view')
    .get(renderBpthbViewPage);

router.use(formErrorHandler);


module.exports = router;