async function getjoiningrequests(){
    return await fetch('http://localhost:3000/joining-request')
    .then((response)=> response.json())
    .then((data)=>data);
}

let joiningrequestBlock = document.querySelector('#v-pills-joining-request');
joiningrequestBlock.addEventListener('click', function(e){
    if(e.target.classList.contains('btn-add')){
        
      
         let id = e.target.parentNode.parentNode.querySelector('.id').value;
        
        fetch('http://localhost:3000/joining-request/mail',{
            method: 'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                email: e.target.parentNode.parentNode.querySelector('.h-email').value,
             
    
            })
        }).then((resp)=> resp.text()); 
        alert('Added!');
        } 

})

 joiningrequestBlock.addEventListener('click', function(e){
    if(e.target.classList.contains('btn-adremove')){
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
          fetch('http://localhost:3000/joining-request/' + id,{
              method: 'DELETE'
          }).then((resp)=> resp.text())
          .then(() => window.history.go());
        }

}) 