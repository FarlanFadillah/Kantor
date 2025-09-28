const wajib_pajak = document.querySelector('#wajib_pajak');
document.getElementById('nik_wajib_pajak').addEventListener('blur', async (event)=>{
    console.log('hello');
    try {
        const nik = event.target.value;
        if(!nik > 0) return;

        const data = await verifyNik(nik);

        let first_name = data.user.first_name;
        let last_name = data.user.last_name;

        // preventing null value
        last_name = last_name || '';

        wajib_pajak.value = first_name + ' ' + last_name;
    }catch(error){
        event.target.value = '';
        wajib_pajak.value = '';
    }

});



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