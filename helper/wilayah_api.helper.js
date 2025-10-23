/**
 * 
 * @param {String} code 
 * @returns nama Provinsi
 */
async function getProvinsi(code){
    const prov_code = code.slice(0,2)

    const raw_json = await fetch('https://api.binderbyte.com/wilayah/provinsi?api_key=e9fcccc089c78226fc3fccc3d787b90dbaf539a4fc241f58673c58c96fc3f2a9');
    const {value} = await raw_json.json();

    return value.find((e)=> {
        return e.id === prov_code;
    });
}

/**
 * 
 * @param {String} code 
 * @returns nama Kabupaten / Kota
 */
async function getKabupaten(code){
    const prov_code = code.slice(0,2)
    const kab_code = code.slice(0, 5);

    const raw_json = await fetch(`https://api.binderbyte.com/wilayah/kabupaten?api_key=e9fcccc089c78226fc3fccc3d787b90dbaf539a4fc241f58673c58c96fc3f2a9&id_provinsi=${prov_code}`);
    const {value} = await raw_json.json();

    return value.find((e)=> {
        return e.id === kab_code;
    });
}



/**
 * 
 * @param {String} code 
 * @returns nama Kecamatan
 */
async function getKecamatan(code){
    const kab_code = code.slice(0, 5);
    const kec_code = code.slice(0, 8);

    const raw_json = await fetch(`https://api.binderbyte.com/wilayah/kecamatan?api_key=e9fcccc089c78226fc3fccc3d787b90dbaf539a4fc241f58673c58c96fc3f2a9&id_kabupaten=${kab_code}`);
    const {value} = await raw_json.json();

    return value.find((e)=> {
        return e.id === kec_code;
    });
}

/**
 * 
 * @param {String} code 
 * @returns nama Kelurahan
 */
async function getkelurahan(code){
    const kec_code = code.slice(0, 8);

    const raw_json = await fetch(`https://api.binderbyte.com/wilayah/kelurahan?api_key=e9fcccc089c78226fc3fccc3d787b90dbaf539a4fc241f58673c58c96fc3f2a9&id_kecamatan=${kec_code}`);
    const {value} = await raw_json.json();

    return value.find((e)=> {
        return e.id === code;
    });
}


module.exports = {
    getProvinsi, 
    getKabupaten,
    getKecamatan,
    getkelurahan
}