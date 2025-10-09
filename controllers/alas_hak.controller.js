const asyncHandler = require("../utils/asyncHandler");
const mainModel = require('../models/main.model');
const { matchedData } = require("express-validator");
const { addMessage } = require("../utils/flash_messages");
const { CustomError } = require("../utils/custom.error");
const { getRequireData, convertLocalDT } = require("../helper/alas_hak_ctrl.helper");
const alasHakModel = require('../models/alas_hak.model');
const {reduceAlasHakTable} = require('../helper/alas_hak_ctrl.helper');

 


/**
 * The form state is determined by the query parameter — if the query
 * contains an id, the form is filled with existing data; if the id is undefined, 
 * the form is rendered empty.
 */
const renderAlasHakForm = asyncHandler(async (req, res, next)=>{
    res.locals.title = 'Form Alas Hak';
    res.locals.form_action = '/alas_hak/form/new';
    
    if(req.query.id !== undefined){
        res.locals.form_action = `/alas_hak/form/edit?id=${req.query.id}`
        
        let form = await alasHakModel.getAlasHakData(req.query.id);
        form = reduceAlasHakTable(form, await mainModel.getAllColumnName('Alas_Hak'));
        res.locals.form_data = form;
    }
    

    res.status(200).render('pages/alas_hak_form');
});

/**
 * Alas hak view page.
 * This page contained details about alas hak.
 */
const renderAlasHakViewPage = asyncHandler(async (req, res, next)=>{
    res.locals.title = 'Alas Hak View';

    if(req.query === undefined) return next(new CustomError('Not Found', 'error', 401));

    let alas_hak = await alasHakModel.getAlasHakData(req.query.id);
    
    alas_hak = reduceAlasHakTable(alas_hak, await mainModel.getAllColumnName('Alas_Hak'));
   
    convertLocalDT(alas_hak);

    res.locals.alas_hak = alas_hak;
    res.status(200).render('pages/alas_hak_view');
});

/**
 * Alas Hak List Page.
 * This page renders a paginated list of Alas Hak data.
 * 
 * Note: Set the routes for the view, delete, and form (empty Alas Hak form page);
 * these routes will populate the table page template.
*/
const renderAlasHakListPage = asyncHandler(async (req, res, next)=>{
    res.locals.title = 'Alas Hak List';
    // total pages
    res.locals.totalPages = Math.ceil(await mainModel.count('Alas_Hak') / Number(res.locals.limit));

    
    res.locals.datas = await mainModel.getPaginationList(
        'Alas_Hak', 
        ['no_alas_hak', 'kel', 'luas', 'tgl_surat_ukur', 'no_surat_ukur', 'id'],
        res.locals.limit, 
        res.locals.offset, 
        'id', 
        'desc'
    );

    // view route
    res.locals.view_route = '/alas_hak/view?id=';

     // delete route
    res.locals.delete_route = '/alas_hak/delete?id=';

    // form route
    res.locals.form_route = '/alas_hak/form';

    res.status(200).render('pages/table_list_page');
})

/**
 * This is actually an middleware
 * after adding alasHak data the next controller 
 * is addAlasHakOwner
 */
const addAlasHak = asyncHandler(async (req, res, next)=>{

    // getting the required fields
    // prevent other column added
    // helping the AlasHak_Clients table data insertion
    let column_name = await mainModel.getAllColumnName('Alas_Hak');
    const fields = getRequireData(column_name, matchedData(req));

    // add data to table
    res.locals.alasHak = await mainModel.addReturnColumn('Alas_hak', fields, 'id');

    // flash message
    addMessage(req, 'success', 'Alas Hak added successfully');

    // going to addAlasHakOwner
    next();
});

/**
 * Delete alas hak controller.
 */
const deleteAlasHak = asyncHandler(async (req, res, next)=>{
    if(!req.query) return next(new CustomError('Id is not defined', 'error', 401));

    await mainModel.del('Alas_Hak', req.query);

    // flash message
    addMessage(req, 'info', 'Alas Hak deleted successfully');

    res.redirect('/alas_hak/list');
})

/**
 * This is actually an middleware
 * after updating alasHak data the next controller 
 * is updateAlasHakOwner
 */
const updateAlasHak = asyncHandler(async (req, res, next)=>{
    console.log(req.body);

    // getting the required fields
    // prevent other column added
    // helping the AlasHak_Clients table data insertion
    let column_name = await mainModel.getAllColumnName('Alas_Hak');
    const fields = getRequireData(column_name, matchedData(req));

    await mainModel.update('Alas_Hak', fields, req.query);

    // flash message
    addMessage(req, 'success', 'Alas Hak updated successfully');

    next();
})

/**
 * Add alas hak owner controller.
 * this is will run after addAlasHak
 */
const addAlasHakOwner = asyncHandler (async (req, res, next)=>{
    let {client_id} = req.body;
    const alasHak_id = res.locals.alasHak.id;

    
    if(client_id !== undefined){
        if(!Array.isArray(client_id)) client_id = [client_id];
    
        for(const id of client_id){
            await mainModel.add('AlasHak_Clients', {client_id : id, alasHak_id : alasHak_id});
        }
    }

    res.redirect(`/alas_hak/view?id=${alasHak_id}`);
})

/**
 * Update alas hak owner controller.
 * this is will run after updateAlasHak
 */
const updateAlasHakOwner = asyncHandler (async (req, res, next)=>{
    const {client_id} = req.body;
    const alasHak_id = req.query.id;

    await mainModel.del('AlasHak_Clients', {alasHak_id : alasHak_id});

    if(client_id && client_id.length > 0){
        for(const id of client_id){
            console.log(id);
            await mainModel.add('AlasHak_Clients', {client_id : id, alasHak_id : alasHak_id})
        }
    }

    res.redirect(`/alas_hak/view?id=${req.query.id}`);
})




module.exports = {
    renderAlasHakForm,
    renderAlasHakViewPage,
    renderAlasHakListPage,
    addAlasHak,
    updateAlasHak,
    addAlasHakOwner,
    updateAlasHakOwner,
    deleteAlasHak
}