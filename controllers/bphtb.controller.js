const asyncHandler = require('../utils/asyncHandler');
const mainModel = require('../models/main.model');
const {addMessage} = require("../utils/flash_messages");

const renderBphtbFormPage = asyncHandler(async (req, res, next) => {
    res.locals.title = 'BPHTB Form';
    const {id} = req.query;

    // empty form
    if(id === undefined) return res.render('pages/bphtb_form', {route : '/bphtb/form/new'});

    // filled form
    // create form_data to store the bphtb 
    const form_data = await mainModel.get('Bphtb', {id : id});

    // getting nik, first name, and last name by getting the clients data by its id
    let {nik, first_name, last_name} = await mainModel.get('Clients', {id : form_data.wajib_pajak}, ['nik', 'first_name', 'last_name']);

    // incase last name is null, because its nullable
    last_name = last_name || '';

    form_data.full_name = first_name + ' ' + last_name;
    form_data.nik_wajib_pajak = nik; 

    res.locals.form_data = form_data;

    res.render('pages/bphtb_form', {route : `/bphtb/form/edit?id=${id}`});
});

const renderBpthbViewPage = asyncHandler(async (req, res, next) => {
    res.locals.title = 'Bphtb View'

    if(req.query === undefined) return res.redirect('/admin/dashboard');

    const bphtb = await mainModel.get('Bphtb', req.query);

    let {first_name, last_name} = await mainModel.get('Clients', {id : bphtb.wajib_pajak}, ['first_name', 'last_name']);

    last_name = last_name || '';

    bphtb.wajib_pajak = first_name + ' ' + last_name;

    res.locals.bphtb = bphtb;

    res.status(200).render('pages/bphtb_view');
});

const addBphtb = asyncHandler(async (req, res, next) => {
    await mainModel.add('Bphtb', req.body);

    // flash message
    addMessage(req, 'info', 'Bphtb successfully created');

    res.redirect('/admin/dashboard');
});

const updateBphtb = asyncHandler(async (req, res, next) => {
    const {id} = req.query;
    await mainModel.update('Bphtb', req.body, {id});

    // flash message
    addMessage(req, 'info', 'Bphtb successfully updated');

    res.redirect('/admin/dashboard');
})

const deleteBphtb = asyncHandler(async (req, res, next) => {
    const {id} = req.query;
    await mainModel.del('Bphtb', {id});

    res.redirect('/admin/dashboard');
})

module.exports = {
    renderBphtbFormPage,
    addBphtb,
    updateBphtb,
    deleteBphtb,
    renderBpthbViewPage
};