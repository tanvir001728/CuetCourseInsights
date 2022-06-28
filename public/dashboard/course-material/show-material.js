let submitbtn = document.querySelector(".btn-slct");

let f=0;

$(document).ready(function(){

    let level = $(".level-sl");
    let term = $(".term-sl");
   
    let sub32 = $(".sem-3-2");
    let sub31 = $(".sem-3-1");
    let def=$(".sem-def");
    level.change(function(){
        term.change(function(){
            let levelselect = $('.level-sl option:selected');
            let termselect = $('.term-sl option:selected');
            
            if(levelselect.val()==='3' && termselect.val()==='i')
            {
                sub31.css('display','block');
                sub32.css('display','none');
                def.css('display','none');
                f=1;
           
            }
            else if(levelselect.val()==='3' && termselect.val()==='ii')
            {
                sub32.css('display','block');
                sub31.css('display','none');
                def.css('display','none');
                f=2;
    
            }
        });
    }) ;
   });
    


submitbtn.addEventListener('click', async function() {
 
    
    let lvl = document.querySelector(".level-sl").value;
    let trm = document.querySelector(".term-sl").value;
    let typ = document.querySelector(".type-sl").value;
    let sub;
    if(f===1){
     sub = document.querySelector(".sub-sl-3-1").value;
    }
    else if(f===2){
        sub = document.querySelector(".sub-sl-3-2").value;
    }
    
    let materials = await getpost();
    let articles = document.querySelector('.articles-uniq');
    let i=1;
    articles.innerHTML='';
    materials.forEach((material) =>{
        if((material.level===lvl)&&(material.term===trm)&&(material.type===typ)&&(material.sub===sub))
        {
            let materialHTML = `<article class="d-flex justify-content-between align-items-center article-inline hd mt-30">
            <div class="num w5">${i++})</div>
            <input class="path" type="hidden" value="${material.pdfpath}">
            <div class="w75">
             <a href="/pdf/${material.pdfpath}" target="_blank">${material.pdfpath}</a>
            </div>
            <div class="w20 text-center"><button class="btn btn-link btn-pick btn-secondary">Pick <i class="far fa-star"></i></button></div>
           </article>`;
           articles.insertAdjacentHTML('beforeend',materialHTML);
        }

    }) 


})

let pickBlock = document.querySelector('.articles-uniq');
pickBlock.addEventListener('click', function(e){
   
    
    if(e.target.classList.contains('btn-pick')){
        
        
        fetch('http://localhost:3000/mydash/yourpick',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                pdfpath: e.target.parentNode.parentNode.querySelector('.path').value,
             
    
            })
        }).then((resp)=> resp.text()); 
        alert('Picked!');
        }  

})