const asyncHandler = require('../utils/asyncHandler');
const mainModel = require('../models/main.model');
const bphtbModel = require('../models/bphtb.model');
const {addMessage} = require("../utils/flash_messages");
const { matchedData } = require('express-validator');
const { convertLocalDT } = require('../helper/alas_hak_ctrl.helper');
const {CustomError} = require("../utils/custom.error");

const bphtbService = require('../services/bphtb.service');

/**
 * Bphtb Form Page.
 * The form state is determined by the query parameter — if the query
 * contains an id, the form is filled with existing data; if the id is undefined, 
 * the form is rendered empty.
 */
const renderBphtbFormPage = asyncHandler(async (req, res, next) => {
    res.locals.title = 'BPHTB Form';
    res.locals.form_action = '/bphtb/form/new';

    const {id} = req.query;

    if(id !== undefined) {
        res.locals.form_action = `/bphtb/form/edit?id=${id}`;
        res.locals.form_data = await bphtbService.getBphtbData(id);
    }
    
    res.render('pages/bphtb_form');
});


/**
 * Bphtb view page.
 * This page contained details about Bphtb.
 */
const renderBpthbViewPage = asyncHandler(async (req, res, next) => {
    res.locals.title = 'Bphtb View'
    
    const {id} = req.query;
    if(id === undefined) return next(new CustomError('bphtb id is undefined'));

    res.locals.bphtb = await bphtbService.getBphtbData(id);;

    res.status(200).render('pages/bphtb_view');
});


/**
 * Add bphtb controller
 */
const addBphtb = asyncHandler(async (req, res, next) => {

    const bphtb_id = await bphtbService.addBphtb({
        ...matchedData(req),
        perintah_bayar : req.body?.perintah_bayar || false,
        lunas : req.body?.lunas || false,
        selesai : req.body?.selesai || false
    });

    // flash message
    addMessage(req, 'info', 'Bphtb successfully created');

    res.redirect(`/bphtb/view?id=${bphtb_id}`);
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