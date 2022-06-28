async function getissue(){
    return await fetch('http://localhost:3000/mydash/getissue')
    .then((response)=> response.json())
    .then((data)=>data);
}

let issueBlock = document.querySelector('#v-pills-issue');
issueBlock.addEventListener('click', function(e){
    
    if(e.target.classList.contains('btn-issueremove')){
        
        let id = e.target.parentNode.parentNode.querySelector('.id').value;
          fetch('http://localhost:3000/mydash/issueremove/' + id,{
              method: 'DELETE'
          }).then((resp)=> resp.text())
          .then(() => window.history.go());
        }

}) 