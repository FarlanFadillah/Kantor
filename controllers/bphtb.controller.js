const asyncHandler = require('../utils/asyncHandler');
const bphtbModel = require('../models/bphtb.model')
const clientModel = require("../models/clients.model");
const {addMessage} = require("../utils/flash_messages");

const renderBphtbFormPage = asyncHandler(async (req, res, next) => {
    res.locals.title = 'BPHTB Form';

    const {id} = req.query;
    res.locals.bphtb = null;
    if(id === undefined) return res.render('pages/bphtb_form', {route : '/bphtb/form/new'});

    res.locals.bphtb = await bphtbModel.getOne(id);

    let {first_name, last_name} = await clientModel.getClient(['first_name', 'last_name'], {id : res.locals.bphtb.wajib_pajak});

    last_name = last_name || '';

    res.locals.bphtb.full_name = first_name + ' ' + last_name;

    res.render('pages/bphtb_form', {route : `/bphtb/form/edit?id=${id}`});
});

const renderBpthbViewPage = asyncHandler(async (req, res, next) => {
    res.locals.title = 'Bphtb View'
    const {id} = req.query;

    if(id === undefined) return res.redirect('/admin/dashboard');

    const bphtb = await bphtbModel.getOne(id);

    let {first_name, last_name} = await clientModel.getClient(['first_name', 'last_name'], {id : bphtb.wajib_pajak});

    last_name = last_name || '';

    bphtb.wajib_pajak = first_name + ' ' + last_name;

    res.locals.bphtb = bphtb;

    res.status(200).render('pages/bphtb_view');
});

const addBphtb = asyncHandler(async (req, res, next) => {
    await bphtbModel.add(req.body);

    // flash message
    addMessage(req, 'info', 'Bphtb successfully created');

    res.redirect('/admin/dashboard');
});

const updateBphtb = asyncHandler(async (req, res, next) => {
    const {id} = req.query;
    await bphtbModel.update(req.body, {id});

    // flash message
    addMessage(req, 'info', 'Bphtb successfully updated');

    res.redirect('/admin/dashboard');
})

const deleteBphtb = asyncHandler(async (req, res, next) => {
    const {id} = req.query;
    await bphtbModel.del({id});

    res.redirect('/admin/dashboard');
})

module.exports = {
    renderBphtbFormPage,
    addBphtb,
    updateBphtb,
    deleteBphtb,
    renderBpthbViewPage
};