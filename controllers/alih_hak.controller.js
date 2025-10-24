const { matchedData } = require("express-validator");
const asyncHandler = require("../utils/asyncHandler");
const { CustomError } = require("../utils/custom.error");
const mainModel = require('../models/main.model');
const alihHakModel = require('../models/alih_hak.model')
const {getRequireData} = require('../utils/customize_obj');
const { addMessage } = require("../utils/flash_messages");
const { convertLocalDT } = require("../helper/alas_hak_ctrl.helper");
const { addPihak } = require("../helper/alih_hak.ctrl.helper");



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
        res.locals.form_data = await alihHakModel.getAllAliHakData(req.query.id);
    }
    res.status(200).render('pages/alihhak_form');
});

/**
 * Alih hak view page.
 * This page contained details about alih hak.
 */
const renderAlihHakViewPage = asyncHandler(async (req, res, next)=>{
    res.locals.title = 'Alih Hak View';

    if(req.query === undefined) return next(new CustomError('Not Found', 'error', 401));

    res.locals.alih_hak = await alihHakModel.getAllAliHakData(req.query.id);

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
    res.locals.totalPages = Math.ceil(await mainModel.count('Alih_Hak') / Number(res.locals.limit));

    res.locals.datas = await alihHakModel.getAlihHakPagination(
        res.locals.limit, 
        res.locals.offset, 
        'Alih_Hak.id', 
        'desc'
    );

    res.status(200).render('pages/table_list_page');
});

/**
 * This is actually an middleware
 * after adding alih Hak data the next controller 
 * is ***
 */
const addAlihHak = asyncHandler(async (req, res, next)=>{

    const alih_hak = await mainModel.addReturnColumn('Alih_Hak', {
        ...matchedData(req),
        ceking_shm  : req.body.ceking_shm || false,
        znt_shm     : req.body.znt_shm || false,
        pph         : req.body.pph || false
    }, 'id');

    await addPihak('penerima_hak', req.body.penerima_hak_id, alih_hak.id);
    await addPihak('pihak_persetujuan', req.body.pihak_persetujuan_id, alih_hak.id);
    await addPihak('kuasa_pemberi', req.body.kuasa_pemberi_id, alih_hak.id);
    await addPihak('kuasa_penerima', req.body.kuasa_penerima_id, alih_hak.id);

    addMessage(req, 'info', 'Alih Hak added successfully');

    res.redirect(`/alih_hak/view?id=${alih_hak.id}`)
});

/**
 * This is actually an middleware
 * after updating alih Hak data the next controller 
 * is for the junction tables controller
 */
const updateAlihHak = asyncHandler(async (req, res, next)=>{

    await mainModel.update('Alih_Hak', {
        ...matchedData(req),
        ceking_shm  : req.body.ceking_shm || false,
        znt_shm     : req.body.znt_shm || false,
        pph         : req.body.pph || false
    }, req.query);

    await addPihak('penerima_hak', req.body.penerima_hak_id, req.query.id);
    await addPihak('pihak_persetujuan', req.body.pihak_persetujuan_id, req.query.id);
    await addPihak('kuasa_pemberi', req.body.kuasa_pemberi_id, req.query.id);
    await addPihak('kuasa_penerima', req.body.kuasa_penerima_id, req.query.id);

    addMessage(req, 'info', 'Alih Hak added successfully');

    res.redirect(`/alih_hak/view?id=${req.query.id}`)
});

/**
 * Delete alih hak controller.
 */
const deleteAlihHak = asyncHandler(async (req, res, next)=>{
    if(!req.query) return next(new CustomError('Id is not defined', 'error', 401));

    await mainModel.del('Alih_Hak', req.query);

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