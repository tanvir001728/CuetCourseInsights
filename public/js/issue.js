let issue_form=document.querySelector(".issue-form");

issue_form.addEventListener('submit',function(e){
    e.preventDefault();
     
    let email = document.getElementById('ab3').value;
    let details = document.getElementById('ab4').value;
    fetch('http://localhost:3000/mydash/issue',{
        method: 'POST',
        headers:{
            'Content-Type':'application/json'
        },
        body: JSON.stringify({
            email:email,
            details: details

        })
    }).then((resp)=> resp.text()).then((data)=>console.log(data)).then(() => window.history.go());
    alert("Your issue has been Submitted ✔"); 
})