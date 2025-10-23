const wilayah_helper = require('./wilayah_api.helper');

async function getAddressDetail(client_obj){
    const address_code = client_obj.address_code;

    const provinsi = await wilayah_helper.getProvinsi(address_code);
    const kabupaten = await wilayah_helper.getKabupaten(address_code);
    const kecamatan = await wilayah_helper.getKecamatan(address_code);
    const kelurahan = await wilayah_helper.getkelurahan(address_code);

    console.log(provinsi.name, kabupaten.name, kecamatan.name, kelurahan.name);

    client_obj.provinsi = provinsi.name;
    client_obj.kab_kota = kabupaten.name;
    client_obj.kec = kecamatan.name;
    client_obj.kel = kelurahan.name;
}


module.exports = {
    getAddressDetail
}