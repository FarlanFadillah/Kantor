const asyncHandler = require("../utils/asyncHandler");


const renderPbbFormPage = asyncHandler(async (req, res, next)=>{
    res.locals.title = 'PBB Form Page'
    res.locals.form_action = ''
    res.locals.form_data = []
    res.status(200).render('pages/pbb_form');
})


module.exports = {
    renderPbbFormPage
}