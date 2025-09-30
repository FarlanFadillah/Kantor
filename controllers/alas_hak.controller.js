const asyncHandler = require("../utils/asyncHandler");
const mainModel = require('../models/main.model');
const { matchedData } = require("express-validator");
const { addMessage } = require("../utils/flash_messages");
const { CustomError } = require("../utils/custom.error");


const renderAlasHakForm = asyncHandler(async (req, res, next)=>{
    res.locals.title = 'Form Alas Hak';
    res.locals.form_action = '/alas_hak/form/new';


    if(req.query.id !== undefined){
        // form action
        res.locals.form_action = `/alas_hak/form/edit?id=${req.query.id}`;
        // get the alas hak data by its id
        const alas_hak_data = await mainModel.get('Alas_hak', req.query);
        res.locals.form_data = alas_hak_data;
    }

    console.log(res.locals.form_data);    
    res.status(200).render('pages/alas_hak_form');
});

const renderAlasHakViewPage = asyncHandler(async (req, res, next)=>{
    res.locals.title = 'Alas Hak View';

    if(req.query === undefined) return next(new CustomError('Not Found', 'error', 401));

    const alas_hak = await mainModel.get('Alas_hak', req.query);

    res.locals.alas_hak = alas_hak;

    res.status(200).render('pages/alas_hak_view');
});


const renderAlasHakListPage = asyncHandler(async (req, res, next)=>{
    res.locals.title = 'Alas Hak List';
    // total pages
    res.locals.totalPages = Math.ceil(await mainModel.count('Alas_Hak') / Number(res.locals.limit));

    // get all client order by updated_at column
    res.locals.datas = await mainModel.getPaginationList(
        'Alas_Hak', 
        ['no_alas_hak', 'kel', 'luas', 'tgl_surat_ukur', 'no_surat_ukur', 'id'],
        res.locals.limit, 
        res.locals.offset, 
        'id', 
        'desc'
    );

    // debug
    console.log(res.locals.datas);

    // view route
    res.locals.view_route = '/alas_hak/view?id=';

    res.status(200).render('pages/table_list_page');
})


const addAlasHak = asyncHandler(async (req, res, next)=>{
    // add data to table
    await mainModel.add('Alas_hak', matchedData(req));

    // flash message
    addMessage(req, 'success', 'Alas Hak added successfully');

    // redirect to dashboard
    res.redirect('/admin/dashboard');
});





module.exports = {
    renderAlasHakForm,
    renderAlasHakViewPage,
    renderAlasHakListPage,
    addAlasHak
}