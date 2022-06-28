let materialrequestform = document.querySelector('.materialrequest-form');
materialrequestform.addEventListener('submit',function(e){
    e.preventDefault();
    fetch('http://localhost:3000/material-request',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            coursetitle: document.querySelector('#coursetitle').value,
            details: document.querySelector('#details').value

        })
    }).then((resp)=> resp.text()).then((data)=>console.log(data));
    alert("Your request is sent successfully ✔");
})