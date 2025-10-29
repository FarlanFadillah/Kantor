const { matchedData } = require("express-validator");
const asyncHandler = require("../utils/asyncHandler");
const { CustomError } = require("../utils/custom.error");
const mainModel = require('../models/main.model');
const alihHakModel = require('../models/alih_hak.model')
const {getRequireData} = require('../utils/customize_obj');
const { addMessage } = require("../utils/flash_messages");
const { convertLocalDT } = require("../helper/alas_hak_ctrl.helper");
const { addPihak } = require("../helper/alih_hak.ctrl.helper");

const alihHakService = require('../services/alih_hak.service')



/**
 * Alih Hak Form Page.
 * The form state is determined by the query parameter — if the query
 * contains an id, the form is filled with existing data; if the id is undefined, 
 * the form is rendered empty.
 */
const renderAlihHakForm = asyncHandler(async (req, res, next)=>{
    res.locals.title = 'Form Alih Hak';
    res.locals.form_action = '/alih_hak/form/new';
    
    if(req.query.id !== undefined){
        res.locals.form_action = `/alih_hak/form/edit?id=${req.query.id}`
        res.locals.form_data = await alihHakService.getAlihHakData(req.query.id);
    }
    res.status(200).render('pages/alihhak_form');
});

/**
 * Alih hak view page.
 * This page contained details about alih hak.
 */
const renderAlihHakViewPage = asyncHandler(async (req, res, next)=>{
    res.locals.title = 'Alih Hak View';

    const {id} = req.query;
    if(!id) return next(new CustomError('Not Found', 'error', 401));

    res.locals.alih_hak = await alihHakService.getAlihHakData(req.query.id);

    res.status(200).render('pages/alih_hak_view');
});

/**
 * Alih Hak List Page.
 * This page renders a paginated list of Alih Hak data.
 * 
 * Note: Set the routes for the view, delete, and form (empty Pbb form page);
 * these routes will populate the table page template.
*/
const renderAlihHakListPage = asyncHandler(async (req, res, next)=>{
    res.locals.table_name = 'Alih Hak';
    res.locals.title = 'Alih Hak List';
    res.locals.view_route = '/alih_hak/view?id=';
    res.locals.delete_route = '/alih_hak/delete?id=';
    res.locals.form_route = '/alih_hak/form';

    const {limit, offset} = res.locals;

    const {alih_hak_data, total_pages} = await alihHakService.getAlihHakDataList(limit, offset);

    res.locals.total_pages = total_pages;

    res.locals.datas = alih_hak_data;

    res.status(200).render('pages/table_list_page');
});

/**
 * This is actually an middleware
 * after adding alih Hak data the next controller 
 * is ***
 */
const addAlihHak = asyncHandler(async (req, res, next)=>{

    const {penerima_hak_id, 
        pihak_persetujuan_id, 
        kuasa_pemberi_id, 
        kuasa_penerima_id} = req.body;

    const alih_hak_id = await alihHakService.addAlihHak(
        {...matchedData(req), 
            ceking_shm  : req.body.ceking_shm || false,
            znt_shm     : req.body.znt_shm || false,
            pph         : req.body.pph || false
        }, 
        {
            penerima_hak_id, 
            pihak_persetujuan_id, 
            kuasa_pemberi_id, 
            kuasa_penerima_id
        }
    )

    addMessage(req, 'info', 'Alih Hak added successfully');

    res.redirect(`/alih_hak/view?id=${alih_hak_id}`)
});

/**
 * This is actually an middleware
 * after updating alih Hak data the next controller 
 * is for the junction tables controller
 */
const updateAlihHak = asyncHandler(async (req, res, next)=>{
    const {id} = req.query;

    if(!id) return next(new CustomError('Id is undefined', 'error', 400));

    const {penerima_hak_id, 
        pihak_persetujuan_id, 
        kuasa_pemberi_id, 
        kuasa_penerima_id} = req.body;

    await alihHakService.updateAlihHak(
        id, 
        {...matchedData(req), 
            ceking_shm  : req.body.ceking_shm || false,
            znt_shm     : req.body.znt_shm || false,
            pph         : req.body.pph || false
        },
        {
            penerima_hak_id, 
            pihak_persetujuan_id, 
            kuasa_pemberi_id, 
            kuasa_penerima_id
        } 
    );

    addMessage(req, 'info', 'Alih Hak added successfully');

    res.redirect(`/alih_hak/view?id=${id}`)
});

/**
 * Delete alih hak controller.
 */
const deleteAlihHak = asyncHandler(async (req, res, next)=>{
    if(!req.query) return next(new CustomError('Id is not defined', 'error', 401));

    await alihHakService.deleteAlihHak(req.query.id);

    // flash message
    addMessage(req, 'info', 'Alih Hak deleted successfully');

    res.redirect('/alih_hak/list');
})


module.exports = {
    renderAlihHakForm,
    addAlihHak,
    updateAlihHak,
    deleteAlihHak,
    renderAlihHakListPage,
    renderAlihHakViewPage
}