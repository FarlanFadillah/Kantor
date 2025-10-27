const asyncHandler = require("../utils/asyncHandler");
const mainModel = require('../models/main.model');
const { matchedData } = require("express-validator");
const { addMessage } = require("../utils/flash_messages");
const { CustomError } = require("../utils/custom.error");
const { convertLocalDT, addAlasHakOwner, updateAlasHakOwner } = require("../helper/alas_hak_ctrl.helper");
const alasHakModel = require('../models/alas_hak.model');
const {getRequireData} = require('../utils/customize_obj');
const { getAddressDetail } = require("../helper/address.form.helper");
const alasHakService = require("../services/alas_hak.service");

 


/**
 * Alas Hak Form Page.
 * The form state is determined by the query parameter — if the query
 * contains an id, the form is filled with existing data; if the id is undefined, 
 * the form is rendered empty.
 */
const renderAlasHakForm = asyncHandler(async (req, res, next)=>{
    res.locals.title = 'Form Alas Hak';
    res.locals.form_action = '/alas_hak/form/new';
    
    if(req.query.id !== undefined){
        res.locals.form_action = `/alas_hak/form/edit?id=${req.query.id}`
        res.locals.form_data = await alasHakService.getAlasHakFormData(req.query.id);
    }
    res.status(200).render('pages/alas_hak_form');
});

/**
 * Alas hak view page.
 * This page contained details about alas hak.
 */
const renderAlasHakViewPage = asyncHandler(async (req, res, next)=>{
    res.locals.title = 'Alas Hak View';

    const {id} = req.query;
    if(!id) return next(new CustomError('id is not defined', 'error', 401));

    res.locals.alas_hak = await alasHakService.getAlasHakViewData(id);

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
    res.locals.table_name = 'Alas Hak';
    res.locals.title = 'Alas Hak List';
    res.locals.view_route = '/alas_hak/view?id=';
    res.locals.delete_route = '/alas_hak/delete?id=';
    res.locals.form_route = '/alas_hak/form';

    const {limit, offset} = res.locals;
    
    const {alas_hak_data, total_pages} = await alasHakService.getAlasHakListData(limit, offset);

    res.locals.datas = alas_hak_data;
    res.locals.total_pages = total_pages;


    res.status(200).render('pages/table_list_page');
})

/**
 * adding alasHak data 
 */
const addAlasHak = asyncHandler(async (req, res, next)=>{

    const alas_hak = await mainModel.addReturnColumn('Alas_hak', matchedData(req), 'id');

    await addAlasHakOwner(req.body.client_id, alas_hak.id);

    addMessage(req, 'info', 'Alas Hak added successfully');

    res.redirect(`/alas_hak/view?id=${res.locals.alasHak.id}`);
});

/**
 * Delete alas hak.
 */
const deleteAlasHak = asyncHandler(async (req, res, next)=>{
    if(!req.query) return next(new CustomError('Id is not defined', 'error', 401));

    await mainModel.del('Alas_Hak', req.query);

    addMessage(req, 'info', 'Alas Hak deleted successfully');

    res.redirect('/alas_hak/list');
})

/**
 * updating alasHak data
 */
const updateAlasHak = asyncHandler(async (req, res, next)=>{
    
    //console.log('fields', fields);
    await mainModel.update('Alas_Hak', matchedData(req), req.query);

    // update alas hak owner
    await updateAlasHakOwner(req.body.client_id, req.query.id)

    // flash message
    addMessage(req, 'info', 'Alas Hak updated successfully');

    res.redirect(`/alas_hak/view?id=${req.query.id}`)
})

module.exports = {
    renderAlasHakForm,
    renderAlasHakViewPage,
    renderAlasHakListPage,
    addAlasHak,
    updateAlasHak,
    deleteAlasHak
}