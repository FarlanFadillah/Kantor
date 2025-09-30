const asyncHandler = require("../utils/asyncHandler");
const {addMessage} = require("../utils/flash_messages");
const mainModel = require('../models/main.model')
const {matchedData} = require('express-validator')


const renderClientFormPage = asyncHandler(async (req, res, next) => {
    res.locals.title = 'Client Form';
    const {id} = req.query;

    // initialize the client data so its not undefined
    if(res.locals.form_data === undefined) res.locals.form_data = null;

    // this scenario when a user request for an empty form
    if(id === undefined) {
        // form action
        res.locals.form_action = '/client/form/new'
        return res.status(200).render('pages/client_form');
    }
    
    // form action
    res.locals.form_action = `/client/edit?id=${id}`;

    // this scenario when a user request to edit a client's data that exist
    // by getting the data by its id
    res.locals.form_data = await mainModel.get('Clients', req.query);

    res.status(200).render('pages/client_form');
})

const renderClientListPage = asyncHandler(async (req, res, next) => {
   res.locals.title = 'Client List';
   let {currentPage} = req.query;

   // Pagination
   // set the limit for every page
   res.locals.limit = 10;

   // current page offset
   res.locals.offset = (res.locals.limit * currentPage) - res.locals.limit;

   // current page
   res.locals.currentPage = currentPage;

   // total pages
   res.locals.totalPages = Math.ceil(await mainModel.count('Clients') / Number(res.locals.limit));

   // get all client order by updated_at column
   res.locals.clients = await mainModel.getPaginationList('Clients', res.locals.limit, res.locals.offset, 'updated_at', 'desc');

   res.status(200).render('pages/client_list_page');
});

const renderClientViewPage = asyncHandler(async (req, res, next) => {
    res.locals.title = 'Client View';

    // get the client data by its id
    res.locals.client_data = await mainModel.get('Clients', req.query);

    res.status(200).render('pages/client_view_page');
})

const addClient = asyncHandler(async (req, res, next) => {
    await mainModel.add('Clients', matchedData(req));

    // flash message
    addMessage(req, 'info', 'Client Added Successfully');

    res.redirect('/admin/dashboard');
});

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
}