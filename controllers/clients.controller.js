const asyncHandler = require("../utils/asyncHandler");
const {addMessage} = require("../utils/flash_messages");
const mainModel = require('../models/main.model')
const {matchedData} = require('express-validator');
const { convertLocalDT } = require("../helper/alas_hak_ctrl.helper");
const {CustomError} = require("../utils/custom.error");
const { getAddressDetail } = require("../helper/address.form.helper");

const clientService = require('../services/clients.service');

/**
 * The form state is determined by the query parameter — if the query
 * contains an id, the form is filled with existing data; if the id is undefined, 
 * the form is rendered empty.
 */
const renderClientFormPage = asyncHandler(async (req, res, next) => {
    res.locals.title = 'Client Form';
    res.locals.form_action = '/client/form/new';
    const {id} = req.query;

    // this scenario when a user request for an empty form
    if(id !== undefined) {
        // form action
        res.locals.form_action = `/client/edit?id=${id}`;

        // this scenario when a user request to edit a client's data that exist
        // by getting the data by its id
        res.locals.form_data = await clientService.getClientData(id);
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
    res.locals.view_route = '/client/view?id=';
    res.locals.delete_route = '/client/delete?id=';
    res.locals.form_route = '/client/form';

    const {limit, offset} = res.locals;

    const {clients_data, total_pages} = await clientService.getClientDataList(limit, offset)

    res.locals.total_pages = total_pages;
    res.locals.datas = clients_data


    res.status(200).render('pages/table_list_page');
});

/**
 * Clients view page.
 * This page contained details about a Client.
 */
const renderClientViewPage = asyncHandler(async (req, res, next) => {
    res.locals.title = 'Client View';

    const {id} = req.query;
    if(id === undefined) return next(new CustomError('client id undefined', 'error', 400))

    res.locals.client_data = await clientService.getClientData(id);
    res.status(200).render('pages/client_view_page');
})

/**
 * Add client controller
 */
const addClient = asyncHandler(async (req, res, next) => {

    const client_id = await clientService.addClient(matchedData(req));

    // flash message
    addMessage(req, 'info', 'Client Added Successfully');

    res.redirect(`/client/view?id=${client_id}`);
});

/**
 * Delete client controller
 */
const deleteClient = asyncHandler(async (req, res, next) => {
    const {id} = req.query
    if(id === undefined) return next(new CustomError('Id is not defined', 'error', 200));

    await clientService.deleteClient(id);

    // flash message
    addMessage(req, 'info', 'Client Deleted Successfully');

    res.redirect('/client/list');
});

/**
 * Update client controller
 */
const updateClient = asyncHandler(async (req, res, next)=>{
    const {id} = req.query;
    if(id === undefined) return next(new CustomError('Id is not defined', 'error', 200));

    await clientService.updateClient(id, matchedData(req));

    // flash message
    addMessage(req, 'info', 'Client Updated Successfully');

    res.redirect(`/client/view?id=${req.query.id}`);
});


module.exports = {
    addClient,
    renderClientFormPage,
    renderClientListPage,
    renderClientViewPage,
    updateClient,
    deleteClient
}