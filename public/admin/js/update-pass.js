let updatepassbtn = document.querySelector('.updatepass-btn');
let oldpass = document.querySelector('#prevpass');
let newpass = document.querySelector('#newpass');
let myemail =  document.querySelector('#adminemail');
updatepassbtn.addEventListener('click', function(){
    
   
    fetch('http://localhost:3000/admins/update', {
        method: 'PUT',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            email:myemail.value,
            oldpassword:oldpass.value,
            newpassword:newpass.value
            

        })
    }).then((resp)=> resp.text())
    .then((data)=>alert(data));
        
})