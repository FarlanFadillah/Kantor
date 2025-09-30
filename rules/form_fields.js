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

const requiredBphtbTextField = [
    'produk',
    'alas_hak',
    'no_alas_hak',
    'wajib_pajak',
    
]

const optionalBphtbTextField = [
    'tgl_survei',
]

module.exports = {
    requiredClientTextFields,
    optionalClientTextFields,
    requiredBphtbTextField,
    optionalBphtbTextField
}