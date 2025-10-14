// client_fullname, client_nik, and client_id already declare in client_search.js
// just use it
let added_id = [];
const message = document.querySelector('#msgs');

// initialize the added_id for existed id
document.querySelectorAll('.client_id').forEach((e)=>{
    added_id.push(Number(e.value));
})

document.querySelector('#add_owner_list').addEventListener('click', (event)=>{
    console.log(added_id);
    if (!client_id.value) {
        message.innerHTML = '<div class="alert alert-danger" role="alert">Cannot add empty client</div>';
        return;
    }
    if(!added_id.includes(Number(client_id.value))) {
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
});


document.querySelector('#owner_list_view').addEventListener('click', (event)=>{
    if(event.target && event.target.classList.contains('remove-owner-btn')){
        event.target.closest('li').remove();
        added_id = added_id.filter(elem => elem !== Number(event.target.dataset.owner));
    }
})


/**
 * All input text are uppercase
 */
document.querySelectorAll("input[type='text']").forEach((element) => {
element.addEventListener("input", () => {
    element.value = element.value.toUpperCase();
});
});