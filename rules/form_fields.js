
// CLIENTS
const requiredClientTextFields = [
    "first_name",
    "job_name",
    "birth_place",
    "provinsi",
    "kab_kota",
    "kec",
    "kel",
    "birth_date",
    "marriage_status",
    "gender"
];

const optionalClientTextFields = [
    "last_name",
    "jalan",
    "rt",
    "rw",
]


// BPHTB
const requiredBphtbTextField = [
    'produk',
    'alas_hak_id',
    'wajib_pajak',
    
]

const optionalBphtbTextField = [
    'tgl_survei',
]


// ALAS HAK
const requiredAlasHakTextField = [
    'jenis_hak',
    'provinsi',
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

module.exports = {
    requiredClientTextFields,
    optionalClientTextFields,
    requiredBphtbTextField,
    optionalBphtbTextField,
    requiredAlasHakTextField,
    optionalAlasHakTextField
}