const asyncHandler = require('../utils/asyncHandler');
const mainModel = require('../models/main.model');
const {addMessage} = require("../utils/flash_messages");
const { matchedData } = require('express-validator');
const { convertLocalDT } = require('../helper/alas_hak_ctrl.helper');
const {CustomError} = require("../utils/custom.error");

/**
 * Bphtb Form Page.
 * The form state is determined by the query parameter — if the query
 * contains an id, the form is filled with existing data; if the id is undefined, 
 * the form is rendered empty.
 */
const renderBphtbFormPage = asyncHandler(async (req, res, next) => {
    res.locals.title = 'BPHTB Form';
    res.locals.form_action = '/bphtb/form/new';

    // this scenario when a user request for an empty form
    if(req.query.id !== undefined) {
        // form action
        res.locals.form_action = `/bphtb/form/edit?id=${req.query.id}`;

        // filled form
        // create form_data to store the bphtb 
        const form_data = await mainModel.get('Bphtb', req.query);

        // getting nik, first name, and last name by getting the clients data by its id
        let {nik, first_name, last_name} = await mainModel.get('Clients', {id : form_data.wajib_pajak}, ['nik', 'first_name', 'last_name']);

        // getting alas hak data
        let {no_alas_hak, kel} = await mainModel.get('Alas_Hak', {id : form_data.alas_hak_id}, ["no_alas_hak", "kel"])

        // incase last name is null, because its nullable
        last_name = last_name || '';

        form_data.full_name = first_name + ' ' + last_name;
        form_data.nik_wajib_pajak = nik;

        form_data.no_alas_hak = no_alas_hak;
        form_data.alas_hak = no_alas_hak + '/' + kel;

        res.locals.form_data = form_data;
        
    }

    res.render('pages/bphtb_form');
});

const renderBpthbViewPage = asyncHandler(async (req, res, next) => {
    res.locals.title = 'Bphtb View'

    if(req.query === undefined) return res.redirect('/admin/dashboard');

    const bphtb = await mainModel.get('Bphtb', req.query);
    // convert the date time to local time asia/jakarta
    convertLocalDT(bphtb);

    // getting wajib pajak data
    let {first_name, last_name} = await mainModel.get('Clients', {id : bphtb.wajib_pajak}, ['first_name', 'last_name']);
    last_name = last_name || '';
    bphtb.wajib_pajak = first_name + ' ' + last_name;

    // getting alas hak data
    let {no_alas_hak, kel} = await mainModel.get('Alas_Hak', {id : bphtb.alas_hak_id}, ["no_alas_hak", "kel"]);
    bphtb.alas_hak = no_alas_hak + '/' + kel;

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
    const cleandata = matchedData(req);

    if(!req.query || !req.query.id) return next(new CustomError('Id is not defined', 'error', 200));

    await mainModel.update('Bphtb', {
        ...cleandata, 
        perintah_bayar : req.body?.perintah_bayar || false,
        lunas : req.body?.lunas || false,
        selesai : req.body?.selesai || false
    }, req.query);

    // flash message
    addMessage(req, 'info', 'Bphtb successfully updated');

    res.redirect(`/bphtb/view?id=${req.query.id}`);
})

const deleteBphtb = asyncHandler(async (req, res, next) => {

    if(!req.query || !req.query.id) return next(new CustomError('Id is not defined', 'error', 200));

    await mainModel.del('Bphtb', req.query);

    res.redirect('/admin/dashboard');
})

module.exports = {
    renderBphtbFormPage,
    addBphtb,
    updateBphtb,
    deleteBphtb,
    renderBpthbViewPage
};