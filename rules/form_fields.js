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
    'alas_hak_id',
    'wajib_pajak',
    
]

const optionalBphtbTextField = [
    'tgl_survei',
]

const requiredAlasHakTextField = [
    'jenis_hak',
    'provinsi',
    'kec',
    'kel',
    'owner_alas_hak'
]


const optionalAlasHakTextField = [
    'jor',
    'tgl_alas_hak',
    'no_surat_ukur',
    'tgl_surat_ukur',
    'ket'
]

module.exports = {
    requiredClientTextFields,
    optionalClientTextFields,
    requiredBphtbTextField,
    optionalBphtbTextField,
    requiredAlasHakTextField,
    optionalAlasHakTextField
}