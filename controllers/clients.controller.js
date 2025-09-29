const asyncHandler = require("../utils/asyncHandler");
const {addMessage} = require("../utils/flash_messages");
const clientsModel =  require('../models/clients.model');
const {matchedData} = require('express-validator')


const renderClientFormPage = asyncHandler(async (req, res, next) => {
    res.locals.title = 'Client Form';
    const {id} = req.query;
    res.locals.client_data = null;
    if(id === undefined) {
        res.locals.form_action = '/client/form/new'
        return res.status(200).render('pages/client_form');
    }

    res.locals.form_action = `/client/edit?id=${id}`;
    res.locals.client_data = await clientsModel.getClientBy(req.query);

    res.status(200).render('pages/client_form');
})

const renderClientListPage = asyncHandler(async (req, res, next) => {
   res.locals.title = 'Client List';
   let {currentPage} = req.query;

   // set the limit for every page
   res.locals.limit = 10;

   // current page offset
   res.locals.offset = (res.locals.limit * currentPage) - res.locals.limit;

   // current page
   res.locals.currentPage = currentPage;

   // total pages
   res.locals.totalPages = Math.ceil(await clientsModel.getClientTotal() / Number(res.locals.limit));

   // get all client order by updated_at column
   res.locals.clients = await clientsModel.getPaginationClientList(res.locals.limit, res.locals.offset);

   res.status(200).render('pages/client_list_page');
});

const renderClientViewPage = asyncHandler(async (req, res, next) => {
    res.locals.title = 'Client View';

    res.locals.client_data = await clientsModel.getClientBy(req.query);

    console.log(res.locals);

    res.status(200).render('pages/client_view_page');
})

const addClient = asyncHandler(async (req, res, next) => {
    await clientsModel.add(matchedData(req));
    // flash message
    addMessage(req, 'info', 'Client Added Successfully');

    res.redirect('/admin/dashboard');
});

const updateClient = asyncHandler(async (req, res, next)=>{

    console.log(req.body);

    await clientsModel.update(req.body, req.query);

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