Table users {
  id integer pk
  username varchar(100)
  hash varchar(255)
}

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
  phone_number varchar(20)

  created_at datetime
  updated_at datetime
}

Table jenis_hak {
  id integer pk
  desc varchar(20)
}

Table alas_hak {
  id integer pk
  no_alas_hak varchar(255) unique

  jenis_hak integer // foreign key

  luas integer
  address_code varchar(20)
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

Table produk {
  id integer pk
  desc varchar(20)
}

Table proses_alas_hak {
  id integer pk

  produk integer // foreign key

  no_surat varchar(50) // nullable
  tgl_surat date

  status enum('DRAFT', 'PENDING', 'ON PROCESS', 'DONE')

  alas_hak_id integer // foreign key

  created_at datetime
  updated_at datetime
}


Table akta_ppat {
  id integer pk

  proses_alashak_id integer // foreign key, nullable

  no_akta varchar(50) // nullable
  tahun_akta integer // nullable
  tgl_akta date // nullable

  produk integer // foreign key

  saksi1_id integer // foreign key
  saksi2_id integer // foreign key

  created_at datetime
  updated_at datetime
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

  tahun_pajak varchar(5)

  address_code varchar(255)
  jor varchar(255)

  created_at datetime
  updated_at datetime
}

Table bphtb {
  id integer pk

  proses_alashak_id integer // foreign key, nullable
  akta_id integer // foreign key, nullable

  no_bphtb varchar(50) unique
  ntpd varchar(50) unique

  client_id integer // foreign key
  alas_hak_id integer // foreign key
  pbb_id integer // foreign key

  produk integer // foreign key //enum('AJB', 'HIBAH', 'WARIS', 'APHB', 'HAK_BARU')

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

  proses_alashak_id integer // nullable
  akta_id integer // nullable

  document_code varchar(255) unique
  no_validasi varchar(255) unique
  tgl_validasi date
  
  no_billing varchar(50)

  client_id integer // foreign key
  pbb_id integer // foreign key

  kode_akun_pajak integer
  kode_jenis_setoran integer
  jumlah_bayar bigint
  jumlah_bukti_bayar integer

  created_at datetime
  updated_at datetime
}

Table client_role {
  id integer pk
  name varchar(255)
}

Table proses_client {
  proses_alashak_id integer pk
  client_id integer pk // add index later
  role integer // foreign key
}



Ref: proses_client.proses_alashak_id < proses_alas_hak.id
Ref: proses_client.client_id < clients.id
Ref: proses_client.role < client_role.id

Ref: "clients_alas_hak"."client_id" < "clients"."id"

Ref: "clients_alas_hak"."alas_hak_id" < "alas_hak"."id"

Ref: "pbb"."client_id" < "clients"."id"

Ref: "pbb"."alas_hak_id" < "alas_hak"."id"

Ref: "bphtb"."client_id" < "clients"."id"

Ref: "bphtb"."alas_hak_id" < "alas_hak"."id"

Ref: "bphtb"."pbb_id" < "pbb"."id"

Ref: "pph"."client_id" < "clients"."id"

Ref: "pph"."pbb_id" < "pbb"."id"

Ref: "proses_alas_hak"."alas_hak_id" < "alas_hak"."id"

Ref: "bphtb"."proses_alashak_id" < "proses_alas_hak"."id"

Ref: akta_ppat.proses_alashak_id < proses_alas_hak.id

Ref: akta_ppat."saksi1_id" < clients.id
Ref: akta_ppat."saksi2_id" < clients.id



Ref: "alas_hak"."jenis_hak" < "jenis_hak"."id"

Ref: "bphtb"."produk" < "produk"."id"

Ref: "proses_alas_hak"."produk" < "produk"."id"