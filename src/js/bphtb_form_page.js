const wajib_pajak = document.querySelector('#wajib_pajak');
const id_wajib_pajak = document.querySelector('#id_wajib_pajak');
document.getElementById('nik_wajib_pajak').addEventListener('blur', async (event)=>{
    try {
        const nik = event.target.value;
        if(!nik > 0) return;

        const data = await verifyNik(nik);

        let first_name = data.user.first_name;
        let last_name = data.user.last_name;

        // preventing null value
        last_name = last_name || '';

        wajib_pajak.value = first_name + ' ' + last_name;
        id_wajib_pajak.value = data.user.id;
    }catch(error){
        event.target.value = '';
        wajib_pajak.value = '';
    }

});

const id_alas_hak = document.querySelector('#alas_hak_id');
const alas_hak = document.querySelector('#alas_hak');

document.querySelector('#no_alas_hak').addEventListener('blur', async (event)=>{
    try {
        const no_alas_hak = event.target.value;

        const data = await verifyAlasHak(no_alas_hak);

        alas_hak.value = data.alasHak.no_alas_hak + "/" + data.alasHak.kel;
        id_alas_hak.value = data.alasHak.id;
    }catch(error){
        event.target.value = '';
        alas_hak.value = '';
    }
})



async function verifyNik(nik){
    try {
        const res = await fetch(`/api/client/nik_verify?nik=${nik}`);
        if (!res.ok) {
            // Baca text biar bisa lihat error aslinya
            const text = await res.text();
            throw new Error(JSON.parse(text).msg);
        }
        return res.json();
    }catch (e) {
        alert("Terjadi error: " + e.message);
    }
}

async function verifyAlasHak(no_alas_hak){
    try {
        const res = await fetch(`/api/alas_hak/verify?no_alas_hak=${no_alas_hak}`);
        if (!res.ok) {
            // Baca text biar bisa lihat error aslinya
            const text = await res.text();
            throw new Error(JSON.parse(text).msg);
        }
        return res.json();
    }catch (e) {
        alert("Terjadi error: " + e.message);
    }
}