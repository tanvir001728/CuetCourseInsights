document.addEventListener('DOMContentLoaded', async function(){
    
    let materials = await getpicks();
    let articles = document.querySelector('.articles-uniq');
    
    articles.innerHTML='';
    let i=1;
    materials.forEach((material) =>{
        
        
            let materialHTML = `<article class="d-flex justify-content-between align-items-center article-inline hd mt-30">
            <div class="num w5">${i++})</div>
            
            <div class="w75">
            <a href="/pdf/${material.pdfpath}" target="_blank">${material.pdfpath}</a>
           
            </div>
            <input class="id" type="hidden" value="${material.id}">
            <div class="w20 text-center"><button class="btn btn-link btn-secondary btn-remvpick">Delete <i class="far fa-trash"></i></button></div>
           </article>`;
           articles.insertAdjacentHTML('beforeend',materialHTML);
        

    }) 

})
async function getpicks(){
    return await fetch('http://localhost:3000/mydash/getpick')
    .then((response)=> response.json())
    .then((data)=>data);
}
let requestBlock = document.querySelector('.articles-uniq');
requestBlock.addEventListener('click', function(e){
    
    if(e.target.classList.contains('btn-remvpick')){
        
        
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
       
          fetch('http://localhost:3000/mydash/' + id,{
              method: 'DELETE'
          }).then((resp)=> resp.text())
          .then(() => window.history.go());
        }

})
