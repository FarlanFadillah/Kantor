
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
    'address_code',
]


const optionalAlasHakTextField = [
    'tgl_alas_hak',
    'no_surat_ukur',
    'tgl_surat_ukur',
    'ket',
    'jor',
]

const no_alas_hak_format = {
    key : /_/g,
    format : '__.__.__.__._._____'
}

// PBB
const requiredPbbTextField = [
    'address_code',
]

const optionalPbbTextField = [
    'luas_tanah',
    'luas_bangunan',
    'njop',
    'jor',
]

const nop_format = {
    key : /_/g,
    format : '__.__.___.___.___-____._'
}


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
    optionalAlihHakTextField,
    no_alas_hak_format,
    nop_format
}