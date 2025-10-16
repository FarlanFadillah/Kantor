const asyncHandler = require("../utils/asyncHandler");


const renderForm = asyncHandler(async(req, res, next)=>{
    res.locals.title = 'Peralihan Hak';
    res.locals.form_action = '/alas_hak/form/new'

    res.status(200).render('pages/alihhak_form')
});



module.exports = {
    renderForm
}