// client_fullname, client_nik, dropdown_menu_alashak, and client_id already declare in client_search.js
// just use it
let penerima_hak_id = []

document.querySelector('#add_penerima_hak_list').addEventListener('click', (event)=>{
    console.log(penerima_hak_id);
    if (!client_id.value) {
        message.innerHTML = '<div class="alert alert-danger" role="alert">Cannot add empty client</div>';
        return;
    }
    if(!penerima_hak_id.includes(Number(client_id.value))) {
        document.querySelector('#owner_list_view')
        .innerHTML += `
            <li id="owner_${client_id.value}" class="list-group-item d-flex justify-content-between align-items-center">
                <span>
                    ${client_fullname.value}
                    <input type="hidden" class="client_id" name="client_id" value="${client_id.value}">
                </span>
                <a id="rm_owner" data-owner="${client_id.value}" class="btn btn-danger btn-sm remove-owner-btn">x</a>
            </li>`

        added_id.push(Number(client_id.value));
        message.innerHTML = ''
    } else{
        message.innerHTML = `<div class="alert alert-danger" role="alert">Client already added</div>`
    }
    client_fullname.value = null;
    client_id.value = null;
    client_nik.value = null;
    dropdown_menu_client.innerHTML = '';
});