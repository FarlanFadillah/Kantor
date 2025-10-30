Table clients {
  id integer pk
  nik varchar(255) unique
  first_name varchar(255)
  last_name varchar(255)
  birth_date date
  birth_place varchar(255)
  job_name varchar(255)
  marriage_status enum('Kawin', 'Belum Kawin', 'Cerai Hidup', 'Cerai Mati')
  gender enum('male', 'female')
  address varchar(255)
  address_code varchar(255)
  rt varchar(255)
  rw varchar(255)
  phone_number varchar(255)

  created_at datetime
  updated_at datetime
}


Table alas_hak {
  id integer pk
  no_alas_hak varchar(255) unique
  jenis_hak enum('SHM', 'SHGB', 'PETA BIDANG', 'NIB', 'SHT')
  luas integer
  address_code varchar(255)
  jor varchar(255)
  tgl_alas_hak date
  no_surat_ukur varchar(255)
  tgl_surat_ukur date
  ket varchar(255)

  created_at datetime
  updated_at datetime
}


Table clients_alas_hak {
  client_id integer pk
  alas_hak_id integer pk
}

Table pbb {
  id integer pk
  client_id integer 
  alas_hak_id integer
  nop varchar(255) unique
  luas_tanah integer
  luas_bangunan integer
  njop_tanah bigint
  njop_bangunan bigint

  address_code varchar(255)
  jor varchar(255)

  created_at datetime
  updated_at datetime
}

Table bphtb {
  id integer pk
  no_bphtb varchar(255) unique
  ntpd varchar(255) unique

  client_id integer
  alas_hak_id integer
  pbb_id integer

  produk enum('AJB', 'HIBAH', 'WARIS', 'APHB', 'HAK_BARU')

  hasil_survei bigint
  tgl_survei date

  perintah_bayar bool
  lunas bool
  status varchar(255)

  created_at datetime
  updated_at datetime

}

Table pph {
  id integer pk
  document_code varchar(255) unique
  no_validasi varchar(255) unique
  tgl_validasi date
  
  no_billing integer unique

  client_id integer
  pbb_id integer

  kode_akun_pajak integer
  kode_jenis_setoran integer
  jumlah_bayar bigint
  jumlah_bukti_bayar integer

}

Table proses_alas_hak {
  id integer pk
  produk enum('PEMECAHAN', 'PENGUKURAN', 
  'KONVERSI HAK', 'PENDAFTARAN HAK', 'ROYA', 'PERALIHAN HAK', 
  'PENGGABUNGAN', 'HAK TANGGUNGAN', 'CEKING', 'ZNT')
}

Ref: "clients_alas_hak"."client_id" < "clients"."id"

Ref: "clients_alas_hak"."alas_hak_id" < "alas_hak"."id"

Ref: "pbb"."client_id" < "clients"."id"

Ref: "pbb"."alas_hak_id" < "alas_hak"."id"

Ref: "bphtb"."client_id" < "clients"."id"

Ref: "bphtb"."alas_hak_id" < "alas_hak"."id"

Ref: "bphtb"."pbb_id" < "pbb"."id"

Ref: "pph"."client_id" < "clients"."id"

Ref: "pph"."pbb_id" < "pbb"."id"