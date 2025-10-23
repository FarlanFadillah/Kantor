
// CLIENTS
const requiredClientTextFields = [
    "first_name",
    "job_name",
    "birth_place",
    "birth_date",
    "marriage_status",
    "gender"
];

const optionalClientTextFields = [
    "last_name",
    "jalan",
    "rt",
    "rw",
    "address_code"
]


// BPHTB
const requiredBphtbTextField = [
    'produk',
    'alas_hak_id',
    'client_id',
    
]

const optionalBphtbTextField = [
    'tgl_survei',
    'pbb_id'
]


// ALAS HAK
const requiredAlasHakTextField = [
    'jenis_hak',
    'provinsi',
    'kab_kota',
    'kec',
    'kel',
]


const optionalAlasHakTextField = [
    'jor',
    'tgl_alas_hak',
    'no_surat_ukur',
    'tgl_surat_ukur',
    'ket',
]

// PBB
const requiredPbbTextField = [
    'provinsi',
    'kab_kota',
    'kec',
    'kel',
]

const optionalPbbTextField = [
    'jor',
    'luas_tanah',
    'luas_bangunan',
    'njop',
]


// ALIH HAK

const requiredAlihHakTextField = [
    'produk'
]

const optionalAlihHakTextField = [
    'tgl_akta',
    'catatan',

]

module.exports = {
    requiredClientTextFields,
    optionalClientTextFields,
    requiredBphtbTextField,
    optionalBphtbTextField,
    requiredAlasHakTextField,
    optionalAlasHakTextField,
    requiredPbbTextField,
    optionalPbbTextField,
    requiredAlihHakTextField,
    optionalAlihHakTextField
}