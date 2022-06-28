

async function getpost(){
   return await fetch('http://localhost:3000/materials')
    .then((response)=> response.json())
    .then((data)=>data);
}