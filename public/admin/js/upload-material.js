
let submitbtn = document.querySelector('.submit-btn');
let uploadform = document.querySelector('.upload-form');
let uploadlevel = document.querySelector('.level-sl');
let uploadterm = document.querySelector('.term-sl');
let uploadtype = document.querySelector('.type-sl');
let uploadsub = document.querySelector('.sub-sl');
let uploadpdf = document.querySelector('#file-upload');
submitbtn.addEventListener('click',function(e){
    e.preventDefault();
    let data = new FormData();
    data.append('level', uploadlevel.value);
    data.append('term', uploadterm.value);
    data.append('type', uploadtype.value);
    data.append('sub', uploadsub.value);
    data.append('pdfpath', uploadpdf.files[0]);

  
    fetch('http://localhost:3000/materials',{
        method:'POST',
        body: data
        })
    .then((response) => response.text()).then((data)=>window.history.go()); 

})