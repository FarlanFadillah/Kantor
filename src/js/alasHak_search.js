const alas_hak_id = document.querySelector('#alas_hak_id');
const alas_hak = document.querySelector('#alas_hak');
const dropdown_menu_alashak = document.querySelector('#alashak-dropdown-menu');
const no_alas_hak = document.querySelector('#no_alas_hak');
no_alas_hak.addEventListener('keyup', async (event)=>{
    try {
        const data = await searchAlasHak(event.target.value);
        // console.log(JSON.stringify(data));
        dropdown_menu_alashak.innerHTML = '';
        for(const alasHak of data.data){
            const li = document.createElement('li');
            const a = document.createElement('a');
            
            // save alashak data to dataset
            a.dataset.id = alasHak.id,
            a.dataset.no_alas_hak = alasHak.no_alas_hak,
            a.dataset.kel = alasHak.kel

            a.classList = 'dropdown-item';
            a.innerHTML = alasHak.no_alas_hak + '/' + alasHak.kel;
            a.addEventListener('click', (event)=>{
                const data = event.target.dataset;
                alas_hak.value = data.no_alas_hak + "/" + data.kel;
                alas_hak_id.value = data.id;
            })
            li.appendChild(a);
            dropdown_menu_alashak.appendChild(li);
        }
    } catch (error) {
        dropdown_menu_alashak.innerHTML = '';
    }
});



async function searchAlasHak(no_alas_hak){
    try {
        const res = await fetch(`/api/alas_hak/search?key=no_alas_hak&value=${no_alas_hak}`);
        if(!res.ok){
            // Baca text biar bisa lihat error aslinya
            const text = await res.text();
            throw new Error(JSON.parse(text).msg);
        }
        return res.json();
    } catch (error) {
        console.log(error);
    }
}

// remove current alas hak
document.querySelector('#rm_alas_hak').addEventListener('click', (e)=>{
    alas_hak.value = null;
    alas_hak_id.value = null;
    no_alas_hak.value = null;
    dropdown_menu_alashak.innerHTML = '';
})
