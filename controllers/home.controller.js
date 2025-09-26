const asyncHandler = require('../utils/asyncHandler')
const bpthbModel = require('../models/bphtb.model')

const renderHomePage = asyncHandler(async (req, res, next)=>{
    res.locals.title = 'Home Page';

    res.locals.bphtb = await bpthbModel.getAll();

    res.status(200).render('pages/home_page');
});

module.exports = {
    renderHomePage
}