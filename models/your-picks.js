let mongoose=require('mongoose');
let Schema=mongoose.Schema;

let pickSchema=new Schema({
    id:String,
    mail:String,
    pdfpath:String
});
let  yourpicks = mongoose.model('yourpicks',pickSchema,'picks');
module.exports={yourpicks}