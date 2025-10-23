const db = require('../database/wilayah.id.db');
const { CustomError } = require('../utils/custom.error');


async function getAllProvinsi(){
    try {
        return await db('provinsi').select('*');
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

async function getKabupatenList(code){
    try {
        return await db('kabupaten').select('*').where('id_provinsi', code);
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

async function getKecamatanList(code){
    try {
        return await db('kecamatan').select('*').where('id_kabupaten', code);
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

async function getKelurahanList(code){
    try {
        return await db('kelurahan').select('*').where('id_kecamatan', code);
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}


/**
 * 
 * @param {String} code 
 * @returns nama Provinsi
 */
async function getProvinsi(address_code){
    try {
        return await db('provinsi').select('*').where('id', address_code.slice(0, 2)).first();
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

/**
 * 
 * @param {String} code 
 * @returns nama Kabupaten / Kota
 */
async function getKabupaten(address_code){
    try {
        return await db('kabupaten').select('*').where('id', address_code.slice(0, 5)).first();
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}



/**
 * 
 * @param {String} code 
 * @returns nama Kecamatan
 */
async function getKecamatan(address_code){
    try {
        return await db('kecamatan').select('*').where('id', address_code.slice(0, 8)).first();
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

/**
 * 
 * @param {String} code 
 * @returns nama Kelurahan
 */
async function getKelurahan(address_code){
    try {
        return await db('kelurahan').select('*').where('id', address_code).first();
    } catch (error) {
        throw new CustomError(error.message, 'error');
    }
}

module.exports = {
    getAllProvinsi,
    getKabupatenList, 
    getKelurahanList,
    getKecamatanList,
    getProvinsi,
    getKabupaten,
    getKecamatan,
    getKelurahan
}