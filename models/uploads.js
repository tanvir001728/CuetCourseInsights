let mongoose=require('mongoose');
let Schema=mongoose.Schema;

let uploadSchema=new Schema({
    id:String,
  
    level:String,
    term:String,
    type:String,
    sub:String,
    pdfpath:String
});
let material = mongoose.model('material',uploadSchema);
module.exports={material}