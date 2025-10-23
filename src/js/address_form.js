const provinsi_option   = document.querySelector('#provinsi_option');
const kab_kota_option   = document.querySelector('#kab_kota_option');
const kec_option        = document.querySelector('#kec_option');
const kel_option        = document.querySelector('#kel_option');

// initialize provinsi data
(async ()=>{
    await initializeAddress();
})();

// Provinsi 
provinsi_option.addEventListener('change', async (event)=>{
    try {
        const option = event.target.options[event.target.selectedIndex];
        await addKabupatenList(option.dataset.code);
    } catch (error) {
        console.log(error)
    }
});


// Kabupaten / Kota
kab_kota_option.addEventListener('change', async (event)=>{
    try {
        
        const option = event.target.options[event.target.selectedIndex];
        await addKecamatanList(option.dataset.code);
    } catch (error) {
        console.log(error)
    }
});


// Kecamatan
kec_option.addEventListener('change', async (event)=>{
    try {
        const option = event.target.options[event.target.selectedIndex];
        await addKelurahanList(option.dataset.code);
    } catch (error) {
        console.log(error)
    }
})


// fetch function
async function initializeAddress(){
    try {
        const data = await getProvinsi();

        // saved address code
        const address_code = provinsi_option.dataset.address;
        const prov_code = address_code.slice(0, 2);

        let selectedIndex = 0;
        data.provinsi.forEach((value, index)=>{
            const option = document.createElement('option');
            option.innerHTML = value.name;
            option.dataset.code = value.id;
            if(value.id === prov_code) selectedIndex = index + 1;
            provinsi_option.appendChild(option);
        });
        provinsi_option.selectedIndex = selectedIndex;

        if(address_code){
            await addKabupatenList(prov_code, address_code);
            await addKecamatanList(address_code.slice(0,5), address_code);
            await addKelurahanList(address_code.slice(0,8), address_code);
        }
    } catch (error) {
        
    }
}


// add kabupaten option
async function addKabupatenList(code, address_code = ''){
    let selectedIndex = 0;
    try {
        kab_kota_option.innerHTML = '<option value="" selected disabled>Pilih Kabupaten / Kota</option>';
        kab_kota_option.disabled = false;
        const data = await getKabupaten(code);

        data.kab_kota.forEach((value, index)=>{
            const option = document.createElement('option');
            option.innerHTML = value.name;
            option.dataset.code = value.id;
            if(address_code && address_code.slice(0,5) === value.id) selectedIndex = index + 1;
            kab_kota_option.appendChild(option);
        })

        kab_kota_option.selectedIndex = selectedIndex;

    } catch (error) {
        console.log(error)
    }
}

// add kecamatan options
async function addKecamatanList(code, address_code = ''){
    let selectedIndex = 0;
    try {
        kec_option.innerHTML = '<option value="" selected disabled>Pilih Kecamatan</option>'
        kec_option.disabled = false;
        const data = await getKecamatan(code);
        data.kec_data.forEach((value, index)=>{
            const option = document.createElement('option');
            option.innerHTML = value.name;
            option.dataset.code = value.id;

            if(address_code && address_code.slice(0,8) === value.id) selectedIndex = index + 1;

            kec_option.appendChild(option);
        })

        kec_option.selectedIndex = selectedIndex;
    } catch (error) {
        console.log(error)
    }
}

// add kelurahan options
async function addKelurahanList(code, address_code = ''){
    let selectedIndex = 0;
    try {
        kel_option.innerHTML = '<option value="" selected disabled>Pilih Kelurahan</option>'
        kel_option.disabled = false;
        const data = await getKelurahan(code);
        data.kel_data.forEach((value, index)=>{
            const option = document.createElement('option');
            option.value = value.id;
            option.innerHTML = value.name;
            option.dataset.code = value.id;
            if(address_code && address_code === value.id) selectedIndex = index + 1;
            kel_option.appendChild(option);
        });

        kel_option.selectedIndex = selectedIndex;

    } catch (error) {
        console.log(error)
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


