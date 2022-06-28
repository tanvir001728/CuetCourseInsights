let login_form=document.querySelector(".login-form");
login_form.addEventListener('submit',function(e){
    e.preventDefault();
    let email = document.getElementById('ab3').value;
    let password = document.getElementById('ab4').value;
    fetch('http://localhost:3000/admins/login',{
        method:'POST',
        headers: {
            'Content-Type':'application/json'
        },
        body:JSON.stringify({email,password})
    }).then((resp)=>{
        if(resp.status ===400){
            throw new Error();

        }
    return resp.json();
    }).then((data)=>{
        window.location.href = data.redirectURL;
    }).catch(()=>alert('Wrong email or password'));
    

})