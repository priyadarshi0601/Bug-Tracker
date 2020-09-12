const mongoose=require('mongoose')
const schema=mongoose.Schema;
const IssueSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    Severity:{
        type:String,
        required:true
    },
    Reporter:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
}, { timestamps: true });
const Issue = mongoose.model('Issue', IssueSchema);
module.exports = Issue;