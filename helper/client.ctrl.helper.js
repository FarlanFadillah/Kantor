const wilayahModel = require('../models/wilayah_id.model')

async function getAddressDetail(client_obj){
    const address_code = client_obj.address_code;

    const provinsi = await wilayahModel.getProvinsi(address_code);
    const kabupaten = await wilayahModel.getKabupaten(address_code);
    const kecamatan = await wilayahModel.getKecamatan(address_code);
    const kelurahan = await wilayahModel.getKelurahan(address_code);

    client_obj.provinsi = provinsi.name;
    client_obj.kab_kota = kabupaten.name;
    client_obj.kec = kecamatan.name;
    client_obj.kel = kelurahan.name;
}


module.exports = {
    getAddressDetail
}