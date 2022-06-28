async function getrequests(){
    return await fetch('http://localhost:3000/material-request')
    .then((response)=> response.json())
    .then((data)=>data);
}

let requestBlock = document.querySelector('#v-pills-material-request');
requestBlock.addEventListener('click', function(e){
    
    if(e.target.classList.contains('btn-remove-l')){
        
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
          fetch('http://localhost:3000/material-request/' + id,{
              method: 'DELETE'
          }).then((resp)=> resp.text())
          .then(() => window.history.go());
        }

})