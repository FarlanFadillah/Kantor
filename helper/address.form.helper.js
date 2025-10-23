const wilayahModel = require('../models/wilayah_id.model')

async function getAddressDetail(obj){
    if(!obj.address_code) return;
    
    const address_code = obj.address_code;

    const provinsi = await wilayahModel.getProvinsi(address_code);
    const kabupaten = await wilayahModel.getKabupaten(address_code);
    const kecamatan = await wilayahModel.getKecamatan(address_code);
    const kelurahan = await wilayahModel.getKelurahan(address_code);

    obj.provinsi = provinsi.name;
    obj.kab_kota = kabupaten.name;
    obj.kec = kecamatan.name;
    obj.kel = kelurahan.name;
}


module.exports = {
    getAddressDetail
}