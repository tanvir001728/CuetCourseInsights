let uploadbtn = document.querySelector('.upload-btn');
let logoutbtn = document.querySelector('.log-out-btn');




document.addEventListener('DOMContentLoaded', async function(){
    let materials = await getpost();
    let articles = document.querySelector('.articles-uniq');
    articles.innerHTML='';
     let materialHTMLlevel = ` <article class="d-flex justify-content-between align-items-center  hd">
        <div class="level w10">Level</div>
        <div class="term w10">Term</div>
        <div class="f-type w15">Material Type</div>
        <div class="sub w15">Subject</div>
        <div class="pdfpath w30">File Name</div>
        <div class="edit w10"></div>
        <div class="delete w10"></div>
      </article>`; 
    articles.insertAdjacentHTML('beforeend',materialHTMLlevel);
    materials.forEach((material) =>{
        let materialHTML = ` <article class="d-flex justify-content-between align-items-center article-inline">
        <div class="level w10">${material.level}</div>
        <input class="id" type="hidden" value="${material.id}">
        <div class="term w10">${material.term}</div>
        <div class="f-type w15">${material.type}</div>
        <div class="sub w15">${material.sub}</div>
        <div class="pdfpath w30">${material.pdfpath}</div>
        <div class="edit w10"><button class="btn btn-link btn-edit"><i class="fas fa-edit" aria-hidden="true"></i>Edit</button></div>
        <div class="delete w10"><button class="btn btn-link btn-remove"><i class="far fa-trash-alt" aria-hidden="true"></i>Delete</button></div>
      </article>`;
      articles.insertAdjacentHTML('beforeend',materialHTML);
    })
    addrequests();
    addjoiningrequests();
    addissues();
})
uploadbtn.addEventListener('click', function(){
   let articles=document.getElementById('v-pills-material');
   articles.classList.remove('show');
   articles.classList.remove('active');
   let uploadtab=document.getElementById('v-pills-upload-material');
   uploadtab.classList.add('show');
   uploadtab.classList.add('active');


})

async function addrequests(){
  let requests = await getrequests();
  let requestblock = document.querySelector('#v-pills-material-request');
  requestblock.innerHTML='';
  let requestHTML = ` <article class="d-flex justify-content-between align-items-center article-inline hd">
    <div class="num w5"></div>
   
    <div class="coursetitle w40">Course Title</div>
    <div class="details w40">Details</div>
    <div class="delete w15"></div>
  </article>`;
  requestblock.insertAdjacentHTML('beforeend',requestHTML);
  let i=1;
  requests.forEach((request) =>{
    let requestHTML = ` <article class="d-flex justify-content-between align-items-center article-inline">
    <div class="num w5">${i++}</div>
    <input class="id" type="hidden" value="${request.id}">
    <div class="coursetitle w40">${request.coursetitle}</div>
    <div class="details w40">${request.details}</div>
    <div class="delete w15"><button class="btn btn-link btn-remove-l"><i class="far fa-trash-alt"></i>Delete</button></div>
  </article>`;
  requestblock.insertAdjacentHTML('beforeend',requestHTML);

})


}

async function addjoiningrequests(){
  let requests = await getjoiningrequests();
  let requestblock = document.querySelector('#v-pills-joining-request');
  requestblock.innerHTML='';
  let requestHTML = ` <article class="d-flex justify-content-between align-items-center article-inline hd">
    <div class="num w5"></div>
   
    <div class="email w50">Email</div>
    <div class="details w40"></div>
    <div class="delete w5"></div>
  </article>`;
  requestblock.insertAdjacentHTML('beforeend',requestHTML);
  let i=1;
  requests.forEach((request) =>{
    let requestHTML = ` <article class="d-flex justify-content-between align-items-center article-inline mb-10">
    <div class="num w5">${i++}</div>
    <input class="id" type="hidden" value="${request.id}">
    <div class="email w50">${request.email}</div>
    <input class="h-email" type="hidden" value="${request.email}">
    <div class="details w30"><button class="btn btn-primary btn-add">Add</button></div>
    <div class="delete w15"><button class="btn btn-link btn-adremove">Delete <i class="far fa-trash-alt"></i></button></div>
  </article>`;
  requestblock.insertAdjacentHTML('beforeend',requestHTML);

})
}

async function addissues(){
  let requests = await getissue();
  let requestblock = document.querySelector('#v-pills-issue');
  requestblock.innerHTML='';
  let requestHTML = ` <article class="d-flex justify-content-between align-items-center article-inline hd">
    
   
    <div class="email w30">Email</div>
    <div class="details w50">Details</div>
    <div class="delete w20"></div>
  </article>`;
  requestblock.insertAdjacentHTML('beforeend',requestHTML);
  
  requests.forEach((request) =>{
    let requestHTML = ` <article class="d-flex justify-content-between align-items-center article-inline mb-10">
    
    <input class="id" type="hidden" value="${request.id}">
    <div class="email w30">${request.email}</div>
    <div class="details w50">${request.details}</div>
    <div class="delete w20"><button class="btn btn-link btn-issueremove">Delete <i class="far fa-trash-alt"></i></button></div>
  </article>`;
  requestblock.insertAdjacentHTML('beforeend',requestHTML);

}) }













logoutbtn.addEventListener('click', function(){
  document.cookie.split(";").forEach(function(c) { document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); });
  window.location.href ='/';
})