const router = require('express').Router();
const process = require('process');


router.get('/address/form', async (req, res)=>{
    res.locals.title = 'Address Form'

    try {
        const data = await fetch(`https://api.binderbyte.com/wilayah/provinsi?api_key=${process.env.WILAYAH_API_KEY}`);
        const provincies_data = await data.json();

        res.status(200).render('partials/adresses_form', {provinsi : provincies_data})
    } catch (error) {
        res.status(400).json({success : false, msg : error.message})
    }

});


// api version

// kab-kota
router.get('/api/regencies', async (req, res)=>{
    const {code} = req.query;
    try {
        const data = await fetch(`https://api.binderbyte.com/wilayah/kabupaten?api_key=${process.env.WILAYAH_API_KEY}&id_provinsi=${code}`);
        const kab_kota_data = await data.json();

        console.log(kab_kota_data);

        res.status(200).json({kab_kota : kab_kota_data.value})
    } catch (error) {
        res.status(400).json({success : false, msg : error.message})
    }
})

// kecamatan
router.get('/api/districts', async(req, res)=>{
    const {code} = req.query;
    try {
        const data = await fetch(`https://api.binderbyte.com/wilayah/kecamatan?api_key=${process.env.WILAYAH_API_KEY}&id_kabupaten=${code}`);
        const kec_data = await data.json();

        res.status(200).json({kec_data : kec_data.value});
    } catch (error) {
        res.status(400).json({success : false, msg : error.message})
    }
})

// kelurahan
router.get('/api/villages', async(req, res)=>{
    const {code} = req.query;
    try {
        const data = await fetch(`https://api.binderbyte.com/wilayah/kelurahan?api_key=${process.env.WILAYAH_API_KEY}&id_kecamatan=${code}`);

        const kel_data = await data.json();
        res.status(200).json({kel_data : kel_data.value});
    } catch (error) {
        res.status(400).json({success : false, msg : error.message})
    }
})



module.exports = router;