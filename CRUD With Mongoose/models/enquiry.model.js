let express= require("express");
let mongoose = require("mongoose");

let userEnquirySchema = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    phone:{
        type:Number,
        required:true,
     },
    message:{
        type:String,
        required:true,
     }

})

let userEnquiryModel= mongoose.model("enquiry",userEnquirySchema);// here "enquiry" is the collection name in database
module.exports = userEnquiryModel;// this is the model that we will use to interact with the database