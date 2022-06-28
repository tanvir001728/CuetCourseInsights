let joiningrequestform = document.querySelector('.joiningrequest-form');
joiningrequestform.addEventListener('submit',function(e){
    e.preventDefault();
    fetch('http://localhost:3000/joining-request',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email: document.querySelector('#email').value,
         

        })
    }).then((resp)=> resp.text()).then((data)=>console.log(data));
    alert("Our admin panel will review your request and send you a confirmation email with password");
})