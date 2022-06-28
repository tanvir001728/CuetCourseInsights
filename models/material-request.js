let mongoose=require('mongoose');
let Schema=mongoose.Schema;

let materialrequestSchema=new Schema({
    id:String,
    coursetitle:String,
    details:String
});
let materialrequest = mongoose.model('materialrequest',materialrequestSchema,'material_requests');
module.exports={materialrequest}