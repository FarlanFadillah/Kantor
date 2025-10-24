// const client_fullname = document.querySelector('#client_fullname');
// const client_id = document.querySelector('#client_id');
// const dropdown_menu_client = document.querySelector('#client-dropdown-menu');
const client_nik = document.querySelectorAll('#client_nik');

let client_search_timer;
client_nik.forEach((element)=>{
    element.addEventListener('input', async (event)=>{
        clearTimeout(client_search_timer);
        client_search_timer = setTimeout(async() => {
            const dropdown_menu_client = element.parentElement.querySelector('#client-dropdown-menu');
            const client_id = element.closest('div').parentElement.querySelector('#client_id');
            const client_fullname = element.closest('div').parentElement.querySelector('.input-group > #client_fullname');
            try {
                const nik = event.target.value;
                if(!nik || nik === undefined) throw new Error('Nik is undefined');

                const data = await searchClient(nik);
                dropdown_menu_client.innerHTML = '';
                for(const client of data.data){
                    const li = document.createElement('li');
                    const a = document.createElement('a');
                    
                    // save alashak data to dataset
                    a.dataset.id = client.id;
                    a.dataset.nik = client.nik;
                    a.dataset.full_name = client.first_name + ' ' + client.last_name;

                    a.classList = 'dropdown-item';
                    a.innerHTML = client.nik + ' ' + client.first_name + ' ' + client.last_name;
                    a.addEventListener('click', (event)=>{
                        const data = event.target.dataset;
                        client_fullname.value = data.full_name;
                        client_id.value = data.id;
                    })
                    li.appendChild(a);
                    dropdown_menu_client.appendChild(li);
                }
                
            } catch (error) {
                dropdown_menu_client.innerHTML = '';
                console.log(error.message)
            }
        }, 300);
    });
})


async function searchClient(keyword){
    try {
        const res = await fetch(`/api/client/search?keyword=${keyword}`)
        if(!res.ok){
            // Baca text biar bisa lihat error aslinya
            const text = await res.text();
            throw new Error(JSON.parse(text).msg);
        }
        return res.json();
    } catch (error) {
        
    }
}

// remove current wajib pajak
document.querySelectorAll('#rm_client').forEach((element)=>{
    element.addEventListener('click', (e)=>{
        e.target.closest('div').querySelector('#client_fullname').value = null;
        e.target.closest('div').parentElement.querySelector('#client_id').value = null;
        e.target.closest('div').parentElement.querySelector('.input-group > #client_nik').value = null;
    });
})