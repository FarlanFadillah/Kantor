const asyncHandler = require("../utils/asyncHandler");
const {addMessage} = require("../utils/flash_messages");
const mainModel = require('../models/main.model')
const {matchedData} = require('express-validator');
const { convertLocalDT } = require("../helper/alas_hak_ctrl.helper");
const {CustomError} = require("../utils/custom.error");

/**
 * The form state is determined by the query parameter — if the query
 * contains an id, the form is filled with existing data; if the id is undefined, 
 * the form is rendered empty.
 */
const renderClientFormPage = asyncHandler(async (req, res, next) => {
    res.locals.title = 'Client Form';
    res.locals.form_action = '/client/form/new';

    // this scenario when a user request for an empty form
    if(req.query.id !== undefined) {
        // form action
        res.locals.form_action = `/client/edit?id=${req.query.id}`;

        // this scenario when a user request to edit a client's data that exist
        // by getting the data by its id
        res.locals.form_data = await mainModel.get('Clients', req.query);
        return res.status(200).render('pages/client_form');
    }
    
    res.status(200).render('pages/client_form');
})

/**
 * Clients List Page.
 * This page renders a paginated list of Clients data.
 * 
 * Note: Set the routes for the view, delete, and form (empty Clients form page);
 * these routes will populate the table page template.
*/
const renderClientListPage = asyncHandler(async (req, res, next) => {
    res.locals.table_name = 'Client';
    res.locals.title = 'Client List';

    // total pages
    res.locals.totalPages = Math.ceil(await mainModel.count('Clients') / Number(res.locals.limit));

    // get all client order by updated_at column
    res.locals.datas = await mainModel.getPaginationList(
        'Clients', 
        ['nik', 'first_name', 'last_name', 'gender', 'job_name', 'kab_kota', 'id'],
        res.locals.limit, 
        res.locals.offset, 
        'updated_at', 
        'desc'
    );

    // view route
    res.locals.view_route = '/client/view?id=';

    // delete route
    res.locals.delete_route = '/client/delete?id=';

    // form route
    res.locals.form_route = '/client/form';

    res.status(200).render('pages/table_list_page');
});

/**
 * Clients view page.
 * This page contained details about a Client.
 */
const renderClientViewPage = asyncHandler(async (req, res, next) => {
    res.locals.title = 'Client View';

    // get the client data by its id
    res.locals.client_data = await mainModel.get('Clients', req.query);

    // convert the date time to local time asia/jakarta
    convertLocalDT(res.locals.client_data);

    res.status(200).render('pages/client_view_page');
})

/**
 * Add client controller
 */
const addClient = asyncHandler(async (req, res, next) => {
    await mainModel.add('Clients', matchedData(req));

    // flash message
    addMessage(req, 'info', 'Client Added Successfully');

    res.redirect('/admin/dashboard');
});

/**
 * Delete client controller
 */
const deleteClient = asyncHandler(async (req, res, next) => {

    if(!req.query) return next(new CustomError('Id is not defined', 'error', 200));

    await mainModel.del('Clients', req.query);

    // flash message
    addMessage(req, 'info', 'Client Deleted Successfully');

    res.redirect('/client/list');
});

/**
 * Update client controller
 */
const updateClient = asyncHandler(async (req, res, next)=>{
    await mainModel.update('Clients', req.body, req.query);

    // flash message
    addMessage(req, 'info', 'Client Updated Successfully');

    res.redirect('/client/list?currentPage=1');
});


module.exports = {
    addClient,
    renderClientFormPage,
    renderClientListPage,
    renderClientViewPage,
    updateClient,
    deleteClient
}