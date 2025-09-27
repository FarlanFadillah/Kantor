const asyncHandler = require("../utils/asyncHandler");
const {addMessage} = require("../utils/flash_messages");
const clientsModel =  require('../models/clients.model');
const {matchedData} = require('express-validator')


const renderClientFormPage = asyncHandler(async (req, res, next) => {
    res.locals.title = 'Client Form';
    res.status(200).render('pages/client_form');
})

const addClient = asyncHandler(async (req, res, next) => {
    console.log(req.body);
    await clientsModel.add(matchedData(req));
    addMessage(req, 'info', 'Client Added Successfully');
    res.redirect(req.header('Referer') || '/admin/dashboard');
});

module.exports = {
    addClient,
    renderClientFormPage
}