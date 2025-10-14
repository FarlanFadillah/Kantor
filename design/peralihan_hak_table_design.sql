CREATE TABLE `alasHak` (
  `id` integer PRIMARY KEY
);

CREATE TABLE `client` (
  `id` integer PRIMARY KEY,
  `name` varchar(255)
);

CREATE TABLE `bphtb` (
  `id` integer PRIMARY KEY,
  `client_id` client.id
);

CREATE TABLE `peralihan_hak` (
  `id` integer PRIMARY KEY,
  `no_akta` integer,
  `tgl_akta` integer,
  `produk` varchar(255),
  `bphtb_id` integer,
  `alas_hak_id` integer,
  `pph` bool,
  `ceking_shm` bool,
  `znt_shm` bool,
  `catatan` varchar(255)
);

CREATE TABLE `penerima_hak` (
  `client_id` integer,
  `ph_id` integer
);

CREATE TABLE `pihak_persetujuan` (
  `client_id` integer,
  `ph_id` integer
);

CREATE TABLE `kuasa_jual` (
  `client_id` integer,
  `ph_id` integer
);

CREATE TABLE `kuasa_beli` (
  `client_id` integer,
  `ph_id` integer
);

ALTER TABLE `client` ADD FOREIGN KEY (`id`) REFERENCES `pihak_persetujuan` (`client_id`);

ALTER TABLE `peralihan_hak` ADD FOREIGN KEY (`id`) REFERENCES `pihak_persetujuan` (`ph_id`);

ALTER TABLE `client` ADD FOREIGN KEY (`id`) REFERENCES `penerima_hak` (`client_id`);

ALTER TABLE `peralihan_hak` ADD FOREIGN KEY (`id`) REFERENCES `penerima_hak` (`ph_id`);

ALTER TABLE `client` ADD FOREIGN KEY (`id`) REFERENCES `bphtb` (`client_id`);

ALTER TABLE `bphtb` ADD FOREIGN KEY (`id`) REFERENCES `peralihan_hak` (`bphtb_id`);

ALTER TABLE `alasHak` ADD FOREIGN KEY (`id`) REFERENCES `peralihan_hak` (`alas_hak_id`);
