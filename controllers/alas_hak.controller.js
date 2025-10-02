const asyncHandler = require("../utils/asyncHandler");
const mainModel = require('../models/main.model');
const { matchedData } = require("express-validator");
const { addMessage } = require("../utils/flash_messages");
const { CustomError } = require("../utils/custom.error");
const { getRequireData, convertLocalDT } = require("../helper/alas_hak_ctrl.helper");
const { makeDateString } = require("../utils/string_tools");


const renderAlasHakForm = asyncHandler(async (req, res, next)=>{
    res.locals.title = 'Form Alas Hak';
    res.locals.form_action = '/alas_hak/form/new';
    res.locals.form_data.owners = [];


    if(req.query.id !== undefined){
        // form action
        res.locals.form_action = `/alas_hak/form/edit?id=${req.query.id}`;
        // get the alas hak data by its id
        const alas_hak_data = await mainModel.get('Alas_hak', req.query);

        // get owner
        const owner_ids = await mainModel.filter('AlasHak_Clients', {alasHak_id : alas_hak_data.id})


        alas_hak_data.owners = []
        for(const {client_id} of owner_ids){
            console.log(client_id);
            alas_hak_data.owners.push(
                await mainModel.get(
                    'Clients',
                    {id : client_id},
                    ['id', 'first_name', 'last_name'])
            );
        }
        res.locals.form_data = alas_hak_data;
    }

    // console.log(res.locals.form_data);
    res.status(200).render('pages/alas_hak_form');
});

const renderAlasHakViewPage = asyncHandler(async (req, res, next)=>{
    res.locals.title = 'Alas Hak View';

    if(req.query === undefined) return next(new CustomError('Not Found', 'error', 401));

    const alas_hak = await mainModel.get('Alas_hak', req.query);
    // convert the date time to local time asia/jakarta
    convertLocalDT(alas_hak);
    console.log(alas_hak);

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

    // getting the required fields
    // prevent other column added
    // helping the AlasHak_Clients table data insertion
    let column_name = await mainModel.getAllColumnName('Alas_Hak');
    const fields = getRequireData(column_name, matchedData(req));

    // add data to table
    res.locals.alasHak = await mainModel.addReturnColumn('Alas_hak', fields, 'id');

    // flash message
    addMessage(req, 'success', 'Alas Hak added successfully');

    // going to addAlasHakOwner
    next();
});


const updateAlasHak = asyncHandler(async (req, res, next)=>{

    // getting the required fields
    // prevent other column added
    // helping the AlasHak_Clients table data insertion
    let column_name = await mainModel.getAllColumnName('Alas_Hak');
    const fields = getRequireData(column_name, matchedData(req));

    await mainModel.update('Alas_Hak', fields, req.query);

    // flash message
    addMessage(req, 'success', 'Alas Hak updated successfully');

    next();
})

const addAlasHakOwner = asyncHandler (async (req, res, next)=>{
    let {client_id} = req.body;
    const alasHak_id = res.locals.alasHak.id;

    if(!Array.isArray(client_id)) client_id = [client_id];

    for(const id of client_id){
        await mainModel.add('AlasHak_Clients', {client_id : id, alasHak_id : alasHak_id});
    }

    res.redirect(`/alas_hak/view?id=${alasHak_id}`);
})

const updateAlasHakOwner = asyncHandler (async (req, res, next)=>{
    const {client_id} = req.body;
    const alasHak_id = req.query.id;

    await mainModel.del('AlasHak_Clients', {alasHak_id : alasHak_id});

    if(client_id && client_id.length > 0){
        for(const id of client_id){
            console.log(id);
            await mainModel.add('AlasHak_Clients', {client_id : id, alasHak_id : alasHak_id})
        }
    }

    res.redirect(`/alas_hak/view?id=${req.query.id}`);
})




module.exports = {
    renderAlasHakForm,
    renderAlasHakViewPage,
    renderAlasHakListPage,
    addAlasHak,
    updateAlasHak,
    addAlasHakOwner,
    updateAlasHakOwner
}