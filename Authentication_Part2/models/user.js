// mongoose connection
const mongoose = require('mongoose');

mongoose.connect(`mongodb://127.0.0.1:27017/authtestapp`);
//schema
const userSchema= mongoose.Schema({
    username: String,
    email: String,
    password: String,
    age: Number,
});
//model
module.exports=mongoose.model('User', userSchema);