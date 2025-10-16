// client_fullname, client_nik, dropdown_menu_alashak, and client_id already declare in client_search.js
// just use it
let client_list = {};
const all_add_btn = document.querySelectorAll('.add-list');
const message = document.querySelector('#msgs');

all_add_btn.forEach((element)=>{
    // get all the requirement fields
    const client_id = element.closest('div').parentElement.querySelector('div > #client_id');
    const client_nik = element.closest('div').parentElement.querySelector('div > #client_nik')
    const client_fullname = element.parentElement.querySelector('#client_fullname');

    // initialize id list
    if(!client_list[element.dataset.field]) client_list[element.dataset.field] = [];

    element.addEventListener('click', (event)=>{
        
        // console.log(penerima_hak_id);
        console.log(element.dataset.field);
        if (!client_id.value) {
            message.innerHTML = '<div class="alert alert-danger" role="alert">Cannot add empty client</div>';
            return;
        }
        if(!client_list[element.dataset.field].includes(Number(client_id.value))) {
            document.querySelector(`#${element.dataset.field}_list_view`)
            .innerHTML += `
                <li id="client_${client_id.value}" class="list-group-item d-flex justify-content-between align-items-center">
                    <span>
                        ${client_fullname.value}
                        <input type="hidden" class="client_id" name="${element.dataset.field}_id" value="${client_id.value}">
                    </span>
                    <a id="rm_client" data-field="${element.dataset.field}" data-client="${client_id.value}" class="btn btn-danger btn-sm remove-client-btn">x</a>
                </li>`
            client_list[element.dataset.field].push(Number(client_id.value));
            
            message.innerHTML = ``;
        } else{
            message.innerHTML = `<div class="alert alert-danger" role="alert">Client already added</div>`
        }
        client_fullname.value = null;
        client_id.value = null;
        client_nik.value = null;
        // dropdown_menu_client.innerHTML = '';
    });
})



document.querySelectorAll('.client_list').forEach((element)=>{
    element.addEventListener('click', (event)=>{
    if(event.target && event.target.classList.contains('remove-client-btn')){
        client_list[event.target.dataset.field] = client_list[event.target.dataset.field].filter(elem => elem !== Number(event.target.dataset.client));
        event.target.closest('li').remove();
        console.log(client_list[event.target.dataset.field]);
    }
})
})


// BPHTB SECTION
const find_bphtb_btn = document.querySelector('#find-bphtb');
const bphtb_table_body = document.querySelector('#bphtb_table_body');
const close_bphtb_modal_btn = document.querySelector('#btn-close-bphtb-modal');
var myModal = new bootstrap.Modal(document.getElementById('bphtb_list'));
const bphtb_items = document.querySelectorAll('#bphtb_item');

find_bphtb_btn.addEventListener('click', async(event)=>{
    if(alas_hak_id.value === '') {
        bphtb_table_body.innerHTML = `
        <td colspan="100%" class="text-center py-3">
            <h2>Pilih Alas Hak terlebih dahulu</h2>
        </td>`;
        return myModal.toggle();
    }
    
    try {
        const res = await searchBphtb(alas_hak_id.value);
        fillBphtbTable(res);
        myModal.toggle();
    } catch (error) {
        
    }
});

close_bphtb_modal_btn.addEventListener('click', (event)=>{
    bphtb_table_body.innerHTML = '';
})

function fillBphtbTable(data){
    console.log(data);
    let i = 1;
    for(const bphtb of data.data){
        const tr = document.createElement('tr');
        const th = document.createElement('th');
        bphtb_table_body.innerHTML += `
        <tr>
            <th scope="row">${i}</th>
            <td>${bphtb.nop || ''}</td>
            <td>${bphtb.no_alas_hak || ''}</td>
            <td>${bphtb.produk || ''}</td>
            <td>${bphtb.first_name || ''} ${bphtb.last_name || ''}</td>
            <td><a class="btn btn-sm btn-info" id="bphtb_item" data-bphtb_id="${bphtb.id}">Pilih</a></td>
        </tr>
        `
        i++;
    }
}


bphtb_items.forEach((element)=>{
    element.addEventListener('click', (event)=>{
        console.log(event.target.value);
    })
})



async function searchBphtb(alas_hak_id) {
    try {
        const res = await fetch(`/api/bphtb/search?key=alas_hak_id&value=${alas_hak_id}`);

        return res.json();
    } catch (error) {
        
    }
}