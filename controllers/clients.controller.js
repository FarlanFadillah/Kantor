const asyncHandler = require("../utils/asyncHandler");
const {addMessage} = require("../utils/flash_messages");
const clientsModel =  require('../models/clients.model');
const {matchedData} = require('express-validator')


const renderClientFormPage = asyncHandler(async (req, res, next) => {
    res.locals.title = 'Client Form';
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
const addClient = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    await clientsModel.add(matchedData(req));
    addMessage(req, 'info', 'Client Added Successfully');
    res.redirect(req.header('Referer') || '/admin/dashboard');
});


module.exports = {
    addClient,
    renderClientFormPage,
    renderClientListPage,
}