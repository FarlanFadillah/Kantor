const provinsi_option   = document.querySelector('#provinsi_option');
const kab_kota_option   = document.querySelector('#kab_kota_option');
const kec_option        = document.querySelector('#kec_option');

// Provinsi
provinsi_option.addEventListener('change', async (event)=>{
    try {
        kab_kota_option.innerHTML = '<option value="" selected disabled>Pilih Kabupaten / Kota</option>';
        kab_kota_option.disabled = false;
        const option = event.target.options[event.target.selectedIndex];
        const data = await getRegencies(option.dataset.code);
        for(const region of data.kab_kota.data){
            const option = document.createElement('option');
            option.value = region.name;
            option.innerHTML = region.name;
            option.dataset.code = region.code;
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
        const data = await getDistricts(option.dataset.code);
        for(const region of data.kec_data.data){
            const option = document.createElement('option');
            option.value = region.name;
            option.innerHTML = region.name;
            option.dataset.code = region.code;
            kec_option.appendChild(option);
        }
    } catch (error) {
        console.log(error)
    }
})



// fetch function

async function getRegencies(code){
    try {
        const res = await fetch(`/debug/api/regencies?code=${code}`);
        
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

async function getDistricts(code){
    try {
        const res = await fetch(`/debug/api/districts?code=${code}`);
        
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

