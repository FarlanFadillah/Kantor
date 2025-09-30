
export function pagination (req, res, next){
    res.locals.datas = [];
    let {currentPage} = req.query;

    if(!currentPage || isNaN(currentPage) || currentPage < 1) currentPage = 1;

    // Pagination
    // set the limit for every page
    res.locals.limit = 10;

    // current page offset
    res.locals.offset = (res.locals.limit * currentPage) - res.locals.limit;

    // current page
    res.locals.currentPage = currentPage;

    next();
}