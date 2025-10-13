const asyncHandler = require("../utils/asyncHandler");
const mainModel = require('../models/main.model');
const pbbModel = require('../models/pbb.model');
const { convertLocalDT } = require("../helper/alas_hak_ctrl.helper");
const { addMessage } = require("../utils/flash_messages");
const { matchedData } = require("express-validator");


/**
 * PBB Form Page.
 * The form state is determined by the query parameter — if the query
 * contains an id, the form is filled with existing data; if the id is undefined, 
 * the form is rendered empty.
 */
const renderPbbFormPage = asyncHandler(async (req, res, next)=>{
    res.locals.title = 'PBB Alas Hak';
    res.locals.form_action = '/pbb/form/new';
    if(req.query.id !== undefined){
        res.locals.form_action = `/pbb/form/edit?id=${req.query.id}`
        let form = await pbbModel.getPbbData(req.query.id);
        console.log(form);
        res.locals.form_data = form;
    }
    

    res.status(200).render('pages/pbb_form');
});


/**
 * Pbb List Page.
 * This page renders a paginated list of Pbb data.
 * 
 * Note: Set the routes for the view, delete, and form (empty Pbb form page);
 * these routes will populate the table page template.
*/
const renderPbbListPage = asyncHandler(async (req, res, next)=>{
    res.locals.title = 'PBB List';
    // total pages
    res.locals.totalPages = Math.ceil(await mainModel.count('PBB_SKNJOP') / Number(res.locals.limit));

    
    res.locals.datas = await mainModel.getPaginationList(
        'PBB_SKNJOP', 
        ['nop', 'kel', 'luas_tanah', 'luas_bangunan', 'njop', 'id'],
        res.locals.limit, 
        res.locals.offset, 
        'id', 
        'desc'
    );

    // view route
    res.locals.view_route = '/pbb/view?id=';

     // delete route
    res.locals.delete_route = '/pbb/delete?id=';

    // form route
    res.locals.form_route = '/pbb/form';

    res.status(200).render('pages/table_list_page');
});

/**
 * PBB view page.
 * This page contained details about Pbb.
 */
const renderPbbViewPage = asyncHandler(async (req, res, next)=>{
    res.locals.title = 'PBB View';

    if(req.query === undefined) return next(new CustomError('Not Found', 'error', 401));

    let pbb = await pbbModel.getPbbData(req.query.id);

    convertLocalDT(pbb);

    console.log(pbb);

    res.locals.pbb = pbb;
    res.status(200).render('pages/pbb_view');
});


/**
 * Add PBB controller
 */
const addPbb = asyncHandler(async (req, res, next)=>{
    const data = matchedData(req);

    // make sure the foreign key is not undefined
    data.client_id = data.client_id || null;
    data.alas_hak_id = data.alas_hak_id || null;

    await mainModel.add('PBB_SKNJOP', data);
    res.redirect('/pbb/list');
});

/**
 * Update PBB controller
 */
const updatePbb = asyncHandler(async (req, res, next) => {
    const data = matchedData(req);

    if(!req.query || !req.query.id) return next(new CustomError('Id is not defined', 'error', 200));

    // make sure the foreign key is null
    data.client_id = data.client_id || null;
    data.alas_hak_id = data.alas_hak_id || null;

    await mainModel.update('PBB_SKNJOP', data, req.query);

    // flash message
    addMessage(req, 'info', 'Pbb successfully updated');

    res.redirect(`/pbb/view?id=${req.query.id}`);
})

/**
 * Delete PBB controller
 */
const deletePbb = asyncHandler(async (req, res, next) => {

    if(!req.query || !req.query.id) return next(new CustomError('Id is not defined', 'error', 200));

    await mainModel.del('PBB_SKNJOP', req.query);

    res.redirect('/pbb/list');
})


module.exports = {
    renderPbbFormPage,
    renderPbbListPage,
    renderPbbViewPage,
    addPbb,
    updatePbb,
    deletePbb
}