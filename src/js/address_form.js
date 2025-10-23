const provinsi_option   = document.querySelector('#provinsi_option');
const kab_kota_option   = document.querySelector('#kab_kota_option');
const kec_option        = document.querySelector('#kec_option');
const kel_option        = document.querySelector('#kel_option');

// initialize provinsi data
(async ()=>{
    await initializeProvinsi();
})();

// Provinsi 
provinsi_option.addEventListener('change', async (event)=>{
    try {
        kab_kota_option.innerHTML = '<option value="" selected disabled>Pilih Kabupaten / Kota</option>';
        kab_kota_option.disabled = false;
        const option = event.target.options[event.target.selectedIndex];
        const data = await getKabupaten(option.dataset.code);

        for(const region of data.kab_kota){
            const option = document.createElement('option');
            option.innerHTML = region.name;
            option.dataset.code = region.id;
            kab_kota_option.appendChild(option);
        }
    } catch (error) {
        console.log(error)
    }
});


// Kabupaten / Kota
kab_kota_option.addEventListener('change', async (event)=>{
    try {
        kec_option.innerHTML = '<option value="" selected disabled>Pilih Kecamatan</option>'
        kec_option.disabled = false;
        const option = event.target.options[event.target.selectedIndex];
        const data = await getKecamatan(option.dataset.code);
        for(const region of data.kec_data){
            const option = document.createElement('option');
            option.innerHTML = region.name;
            option.dataset.code = region.id;
            kec_option.appendChild(option);
        }
    } catch (error) {
        console.log(error)
    }
});


// Kecamatan
kec_option.addEventListener('change', async (event)=>{
    try {
        kel_option.innerHTML = '<option value="" selected disabled>Pilih Kelurahan</option>'
        kel_option.disabled = false;
        const option = event.target.options[event.target.selectedIndex];
        const data = await getKelurahan(option.dataset.code);
        for(const region of data.kel_data){
            const option = document.createElement('option');
            option.value = region.id;
            option.innerHTML = region.name;
            option.dataset.code = region.id;
            kel_option.appendChild(option);
        }
    } catch (error) {
        console.log(error)
    }
})



// fetch function
async function initializeProvinsi(){
    try {
        const data = await getProvinsi();

        for(const region of data.provinsi){
            const option = document.createElement('option');
            option.innerHTML = region.name;
            option.dataset.code = region.id;
            provinsi_option.appendChild(option);
        }

    } catch (error) {
        
    }
}

async function getProvinsi(){
    try {
        const res = await fetch(`/api/wilayah/provinsi`);
        
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getKabupaten(code){
    try {
        const res = await fetch(`/api/wilayah/kabupaten?code=${code}`);
        
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getKecamatan(code){
    try {
        const res = await fetch(`/api/wilayah/kecamatan?code=${code}`);
        
        return res.json();
    } catch (error) {
        console.log(error);
    }
}


async function getKelurahan(code){
    try {
        const res = await fetch(`/api/wilayah/kelurahan?code=${code}`);
        
        return res.json();
    } catch (error) {
        console.log(error);
    }
}


