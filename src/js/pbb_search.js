const pbb_status = document.querySelector('#nop-status');
const nop_input = document.querySelector('#nop');
const pbb_id = document.querySelector('#pbb_id');
const dropdown_menu_pbb = document.querySelector('#pbb-dropdown-menu');
nop_input.addEventListener('keyup', async (event)=>{
    try {
        const nop = event.target.value;
        if(!nop || nop === undefined) throw new Error('Nik is undefined');

        const res = await searchPbb(nop);
        dropdown_menu_pbb.innerHTML = '';
        for(const pbb of res.data){
            const li = document.createElement('li');
            const a = document.createElement('a');
            
            // save alashak data to dataset
            a.dataset.id = pbb.id;
            a.dataset.nop = pbb.nop;
            a.dataset.kel = pbb.kel;

            a.classList = 'dropdown-item';
            a.innerHTML = pbb.nop +'/'+pbb.kel;
            a.addEventListener('click', (event)=>{
                const data = event.target.dataset;
                nop_input.value = data.nop;
                pbb_id.value = data.id;
                pbb_status.innerHTML = `<i class="bi bi-check-circle-fill text-success"></i>`;
            })
            li.appendChild(a);
            dropdown_menu_pbb.appendChild(li);
        }
        
    } catch (error) {
        dropdown_menu_pbb.innerHTML = '';
        nop_input.value = null;
        pbb_id.value = null;
        console.log(error.message)
        pbb_status.innerHTML = `<i id="pbb_status" class="bi bi-x-circle-fill text-danger"></i>`;
    }
});

async function searchPbb(nop){
    try {
        const res = await fetch(`/api/pbb/search?key=nop&value=${nop}`)
        if(!res.ok){
            // Baca text biar bisa lihat error aslinya
            const text = await res.text();
            throw new Error(JSON.parse(text).msg);
        }
        return res.json();
    } catch (error) {
        
    }
}



