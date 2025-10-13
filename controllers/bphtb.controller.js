const asyncHandler = require('../utils/asyncHandler');
const mainModel = require('../models/main.model');
const bphtbModel = require('../models/bphtb.model');
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
        // get form_data to store the bphtb form 
        const form_data = await bphtbModel.getBphtbData(req.query.id);

        res.locals.form_data = form_data;
        
    }

    res.render('pages/bphtb_form');
});


/**
 * Bphtb view page.
 * This page contained details about Bphtb.
 */
const renderBpthbViewPage = asyncHandler(async (req, res, next) => {
    res.locals.title = 'Bphtb View'

    if(req.query === undefined) return res.redirect('/admin/dashboard');

    const bphtb = await bphtbModel.getBphtbData(req.query.id);
    
    // convert the date time to local time asia/jakarta
    convertLocalDT(bphtb);

    res.locals.bphtb = bphtb;

    res.status(200).render('pages/bphtb_view');
});


/**
 * Add bphtb controller
 */
const addBphtb = asyncHandler(async (req, res, next) => {
    const cleandata = matchedData(req);
    
    // make sure the foreign key is not undefined
    cleandata.pbb_id = cleandata.pbb_id || null;

    await mainModel.add('Bphtb', {
        ...cleandata,
        perintah_bayar : req.body?.perintah_bayar || false,
        lunas : req.body?.lunas || false,
        selesai : req.body?.selesai || false
    });

    // flash message
    addMessage(req, 'info', 'Bphtb successfully created');

    res.redirect('/admin/dashboard');
});

/**
 * Update bphtb controller
 */
const updateBphtb = asyncHandler(async (req, res, next) => {
    const cleandata = matchedData(req);

    // make sure the foreign key is not undefined
    cleandata.pbb_id = cleandata.pbb_id || null;

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

/**
 * Delete bphtb controller
 */
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