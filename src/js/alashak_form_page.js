const client_fullname = document.querySelector('#client_fullname');
  const client_nik = document.querySelector('#client_nik');
  let data = {};
  let added_id = [];


  // initialize the added_id
  document.querySelectorAll('.client_id').forEach((e)=>{
    added_id.push(Number(e.value));
  })

  client_nik.addEventListener('blur', async (event)=>{
    console.log('nik verifing');
    try {
        const nik = event.target.value;
        if(!nik > 0) return;

        data = await verifyNik(nik);

        let first_name = data.user.first_name;
        let last_name = data.user.last_name;

        // preventing null value
        last_name = last_name || '';

        client_fullname.value = first_name + ' ' + last_name;
        
    }catch(error){
        event.target.value = '';
        wajib_pajak.value = '';
    }
  });
  document.querySelector('#add_owner_list').addEventListener('click', (event)=>{
    console.log(added_id);
    if(!added_id.includes(data.user.id)) {
        document.querySelector('#owner_list_view')
        .innerHTML += `
            <li id="owner_${data.user.id}" class="list-group-item d-flex justify-content-between align-items-center">
                <span>
                    ${data.user.first_name} ${data.user.last_name}
                    <input type="hidden" class="client_id" name="client_id" value="${data.user.id}">
                </span>
                <a id="rm_owner" data-owner="${data.user.id}" class="btn btn-danger btn-sm remove-owner-btn">x</a>
            </li>`

        added_id.push(data.user.id);
        document.querySelector('#msgs').innerHTML = ''
    } else{
      document.querySelector('#msgs').innerHTML += `<div class="alert alert-danger" role="alert">Client already added</div>`
    }
    client_fullname.value = ''
    client_nik.value = ''
    data = {};
  });


  document.querySelector('#owner_list_view').addEventListener('click', (event)=>{
      if(event.target && event.target.classList.contains('remove-owner-btn')){
          event.target.closest('li').remove();
          added_id = added_id.filter(elem => elem !== Number(event.target.dataset.owner));
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

/**
 * All input text are uppercase
 */
document.querySelectorAll("input[type='text']").forEach((element) => {
element.addEventListener("input", () => {
    element.value = element.value.toUpperCase();
});
});