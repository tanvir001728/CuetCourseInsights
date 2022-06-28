

let articles = document.querySelector('.articles-uniq');


articles.addEventListener('click',function(e){
    if(e.target.classList.contains('btn-remove')){
      let id = e.target.parentNode.parentNode.querySelector('.id').value;
        fetch('http://localhost:3000/materials/' + id,{
            method: 'DELETE'
        }).then((resp)=> resp.text())
        .then(() => window.history.go());
       
      
       

    }
  

})
