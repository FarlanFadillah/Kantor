const { matchedData } = require("express-validator");
const asyncHandler = require("../utils/asyncHandler");
const { CustomError } = require("../utils/custom.error");
const mainModel = require('../models/main.model');
const alihHakModel = require('../models/alih_hak.model')
const {getRequireData} = require('../utils/customize_obj');
const { addMessage } = require("../utils/flash_messages");
const { convertLocalDT } = require("../helper/alas_hak_ctrl.helper");



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
        
        let form = await alihHakModel.getAllAliHakData(req.query.id);
        res.locals.form_data = form;
    }
    // res.status(200).json(res.locals.form_data);
    res.status(200).render('pages/alihhak_form');
});

/**
 * Alih hak view page.
 * This page contained details about alih hak.
 */
const renderAlihHakViewPage = asyncHandler(async (req, res, next)=>{
    res.locals.title = 'Alih Hak View';

    if(req.query === undefined) return next(new CustomError('Not Found', 'error', 401));

    const alih_hak = await alihHakModel.getAllAliHakData(req.query.id);

    convertLocalDT(alih_hak);

    res.locals.alih_hak = alih_hak;
    // res.status(200).json({alih_hak})
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
    // total pages
    res.locals.totalPages = Math.ceil(await mainModel.count('Alih_Hak') / Number(res.locals.limit));

    
    let alih_hak = await alihHakModel.getAlihHakPagination(
        res.locals.limit, 
        res.locals.offset, 
        'Alih_Hak.id', 
        'desc'
    );

    res.locals.datas = alih_hak;

    // view route
    res.locals.view_route = '/alih_hak/view?id=';

     // delete route
    res.locals.delete_route = '/alih_hak/delete?id=';

    // form route
    res.locals.form_route = '/alih_hak/form';

    res.status(200).render('pages/table_list_page');
});

/**
 * This is actually an middleware
 * after adding alih Hak data the next controller 
 * is ***
 */
const addAlihHak = asyncHandler(async (req, res, next)=>{

    // getting the required fields
    // prevent other column added
    // helping the Alih_Hak junction table data insertion
    let column_name = await mainModel.getAllColumnName('Alih_Hak');
    const fields = getRequireData(column_name, matchedData(req));

    // add data to table
    res.locals.alih_hak = await mainModel.addReturnColumn('Alih_Hak', {
        ...fields,
        ceking_shm  : req.body.ceking_shm || false,
        znt_shm     : req.body.znt_shm || false,
        pph         : req.body.pph || false
    }, 'id');

    // flash message
    addMessage(req, 'info', 'Alih Hak added successfully');

    next()
});

/**
 * This is actually an middleware
 * after updating alih Hak data the next controller 
 * is for the junction tables controller
 */
const updateAlihHak = asyncHandler(async (req, res, next)=>{

    // getting the required fields
    // prevent other column added
    // helping the Alih_Hak junction table data insertion
    let column_name = await mainModel.getAllColumnName('Alih_Hak');
    const fields = getRequireData(column_name, matchedData(req));

    console.log(matchedData(req));

    // update data
    await mainModel.update('Alih_Hak', {
        ...fields,
        ceking_shm  : req.body.ceking_shm || false,
        znt_shm     : req.body.znt_shm || false,
        pph         : req.body.pph || false
    }, req.query);

    res.locals.alih_hak = req.query;

    // flash message
    addMessage(req, 'info', 'Alih Hak added successfully');

    next();
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


/**
 * Add penerima hak controller.
 * this is will run after addAlihHak
 */
const addPihakPenerima = asyncHandler (async (req, res, next)=>{
    let {penerima_hak_id} = req.body;

    // delete if exists and add it later
    await mainModel.del('penerima_hak', {'alih_hak_id' : res.locals.alih_hak.id});
    
    if(penerima_hak_id !== undefined){
        if(!Array.isArray(penerima_hak_id)) penerima_hak_id = [penerima_hak_id];
    
        for(const id of penerima_hak_id){
            if(id){
                await mainModel.add('penerima_hak', {client_id : id, alih_hak_id : res.locals.alih_hak.id});
            }
        }
    }

    next();
})

/**
 * Add pihak persetujuan controller.
 * this is will run after addPihakPenerim
 */
const addPihakPersetujuan = asyncHandler (async (req, res, next)=>{
    let {pihak_persetujuan_id} = req.body;

    // delete if exists and add it later
    await mainModel.del('pihak_persetujuan', {'alih_hak_id' : res.locals.alih_hak.id});

    
    if(pihak_persetujuan_id !== undefined){
        if(!Array.isArray(pihak_persetujuan_id)) pihak_persetujuan_id = [pihak_persetujuan_id];
    
        for(const id of pihak_persetujuan_id){
            if(id){
                await mainModel.add('pihak_persetujuan', {client_id : id, alih_hak_id : res.locals.alih_hak.id});
            }
        }
    }

    next();
})

/**
 * Add kuasa pemberi controller.
 * this is will run after addPihakPenerim
 */
const addKuasaPemberi = asyncHandler (async (req, res, next)=>{
    let {kuasa_pemberi_id} = req.body;

    // delete the junction table and add it later
    await mainModel.del('kuasa_pemberi', {'alih_hak_id' : res.locals.alih_hak.id});

    
    if(kuasa_pemberi_id !== undefined){
        if(!Array.isArray(kuasa_pemberi_id)) kuasa_pemberi_id = [kuasa_pemberi_id];
    
        for(const id of kuasa_pemberi_id){
            if(id){
                await mainModel.add('kuasa_pemberi', {client_id : id, alih_hak_id : res.locals.alih_hak.id});
            }
        }
    }

    next();
})

/**
 * Add kuasa pemberi controller.
 * this is will run after addPihakPenerim
 */
const addKuasaPenerima = asyncHandler (async (req, res, next)=>{
    let {kuasa_penerima_id} = req.body;

    // delete if exists and add it later
    await mainModel.del('kuasa_penerima', {'alih_hak_id' : res.locals.alih_hak.id});

    
    if(kuasa_penerima_id !== undefined){
        if(!Array.isArray(kuasa_penerima_id)) kuasa_penerima_id = [kuasa_penerima_id];
    
        for(const id of kuasa_penerima_id){
            if(id){
                await mainModel.add('kuasa_penerima', {client_id : id, alih_hak_id : res.locals.alih_hak.id});
            }
        }
    }

    res.redirect(`/alih_hak/view?id=${res.locals.alih_hak.id}`);
})


module.exports = {
    renderAlihHakForm,
    addAlihHak,
    addPihakPenerima, 
    addPihakPersetujuan,
    addKuasaPemberi,
    addKuasaPenerima,
    updateAlihHak,
    deleteAlihHak,
    renderAlihHakListPage,
    renderAlihHakViewPage
}