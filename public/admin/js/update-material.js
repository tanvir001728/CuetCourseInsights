{
let articles = document.querySelector('.articles-uniq');
let updatebtn = document.querySelector('.submit-update-btn');
let levelinp = document.querySelector('.update-level');
let terminp = document.querySelector('.update-term');
let typeinp = document.querySelector('.update-type');
let subinp = document.querySelector('.update-sub');
let id;



articles.addEventListener('click', async function(e){
    if(e.target.classList.contains('btn-edit')){
         id = e.target.parentNode.parentNode.querySelector('.id').value;
        let materialinfo = await  fetch('http://localhost:3000/materials/' + id)
        .then((resp) => resp.json())
        .then((data) => data)

      
        levelinp.value = materialinfo.level;
       
        terminp.value = materialinfo.term;
       
        typeinp.value = materialinfo.type;
      
        subinp.value = materialinfo.sub;

        let articles=document.getElementById('v-pills-material');
        articles.classList.remove('show');
        articles.classList.remove('active');
        let uploadtab=document.getElementById('v-pills-update-material');
        uploadtab.classList.add('show');
        uploadtab.classList.add('active');
     
      
       

    }
  

})

updatebtn.addEventListener('click', function()
{
    fetch('http://localhost:3000/materials/'+ id, {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            level:levelinp.value,
            term:terminp.value,
            type:typeinp.value,
            sub:subinp.value

        })
    }).then((resp)=> resp.text())
    .then(()=>window.history.go());


})


}





