const router = require('express').Router();
const process = require('process');
const wilayahModel = require('../../models/wilayah_id.model')

// provinsi
router.get('/provinsi', async (req, res)=>{
    try {
        const data = await wilayahModel.getAllProvinsi();

        res.status(200).json({provinsi : data})
    } catch (error) {
        res.status(400).json({success : false, msg : error.message})
    }

});


// kab-kota
router.get('/kabupaten', async (req, res)=>{
    const {code} = req.query;
    try {
        const data = await wilayahModel.getKabupatenList(code);

        res.status(200).json({kab_kota : data})
    } catch (error) {
        res.status(400).json({success : false, msg : error.message})
    }
})

// kecamatan
router.get('/kecamatan', async(req, res)=>{
    const {code} = req.query;
    try {
        const data = await wilayahModel.getKecamatanList(code); 

        res.status(200).json({kec_data : data});
    } catch (error) {
        res.status(400).json({success : false, msg : error.message})
    }
})

// kelurahan
router.get('/kelurahan', async(req, res)=>{
    const {code} = req.query;
    try {
        const data = await wilayahModel.getKelurahanList(code);

        res.status(200).json({kel_data : data});
    } catch (error) {
        res.status(400).json({success : false, msg : error.message})
    }
})



module.exports = router;