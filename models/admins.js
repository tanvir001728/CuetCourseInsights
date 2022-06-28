let mongoose=require('mongoose');
let Schema=mongoose.Schema;

let adminsSchema=new Schema({
    
  
    email:String,
    password:String,
    
});
let Admins = mongoose.model('Admins',adminsSchema,'admins');
module.exports={Admins}