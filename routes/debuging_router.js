const router = require('express').Router();


router.get('/address/form', async (req, res)=>{
    res.locals.title = 'Address Form'

    try {
        const data = await fetch('https://wilayah.id/api/provinces.json');
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
        const data = await fetch(`https://wilayah.id/api/regencies/${code}.json`);
        const kab_kota_data = await data.json();

        res.status(200).json({kab_kota : kab_kota_data})
    } catch (error) {
        res.status(400).json({success : false, msg : error.message})
    }
})

// kecamatan
router.get('/api/districts', async(req, res)=>{
    const {code} = req.query;
    try {
        const data = await fetch(`https://wilayah.id/api/districts/${code}.json`);
        const kec_data = await data.json();

        res.status(200).json({kec_data});
    } catch (error) {
        res.status(400).json({success : false, msg : error.message})
    }
})

// kelurahan
router.get('/api/villages', async(req, res)=>{
    const {code} = req.query;
    try {
        const data = await fetch(`https://wilayah.id/api/villages/${code}.json`);
        const kel_data = await data.json();
        console.log('kel data', kel_data);
        res.status(200).json({kel_data});
    } catch (error) {
        res.status(400).json({success : false, msg : error.message})
    }
})



module.exports = router;