document.querySelectorAll('.click_able_row').forEach((element)=>{
    const href = element.dataset.href;
    element.addEventListener('click',function(){
        window.location = href;
    })
})