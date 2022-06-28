let mongoose=require('mongoose');
let Schema=mongoose.Schema;

let joiningrequestSchema=new Schema({
    id:String,
    email:String,
});
let joiningrequest = mongoose.model('joiningrequest',joiningrequestSchema,'joining_requests');
module.exports={joiningrequest}