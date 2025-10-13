const id_alas_hak = document.querySelector('#alas_hak_id');
const alas_hak = document.querySelector('#alas_hak');
const dropdown_menu = document.querySelector('.dropdown-menu');

document.querySelector('#no_alas_hak').addEventListener('keyup', async (event)=>{
    try {
        const data = await searchAlasHak(event.target.value);

        dropdown_menu.innerHTML = '';
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
                id_alas_hak.value = data.id;
            })
            li.appendChild(a);
            dropdown_menu.appendChild(li);
        }
    } catch (error) {
        dropdown_menu.innerHTML = '';
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