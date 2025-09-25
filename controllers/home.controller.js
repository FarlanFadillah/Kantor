const asyncHandler = require('../utils/asyncHandler')

const renderHomePage = asyncHandler(async (req, res, next)=>{
    res.locals.title = 'Home Page';

    res.status(200).render('pages/home_page');
});

module.exports = {
    renderHomePage
}