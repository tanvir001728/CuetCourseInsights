let mongoose=require('mongoose');
let Schema=mongoose.Schema;

let issueSchema=new Schema({
    id:String,
    email:String,
    details:String
});
let issue = mongoose.model('issue',issueSchema,'issues');
module.exports={issue}