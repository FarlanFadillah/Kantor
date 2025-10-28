const wilayahModel = require('../models/wilayah_id.model')

/**
 * 
 * @param {Object} obj 
 * modified an object that contains address_code 
 * and add addresses key value 
 */
async function getAddressDetail(obj){
    if(!obj?.address_code) return;

    const result = {...obj};
    
    const address_code = result.address_code;

    const provinsi = await wilayahModel.getProvinsi(address_code);
    const kabupaten = await wilayahModel.getKabupaten(address_code);
    const kecamatan = await wilayahModel.getKecamatan(address_code);
    const kelurahan = await wilayahModel.getKelurahan(address_code);

    result.provinsi = provinsi.name;
    result.kab_kota = kabupaten.name;
    result.kec = kecamatan.name;
    result.kel = kelurahan.name;

    return result;
}


module.exports = {
    getAddressDetail
}