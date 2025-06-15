const mongoose = require('mongoose');
// const { use } = require('react');
mongoose.connect(`mongodb://127.0.0.1:27017/mongopractice`);

const userSchema=mongoose.Schema({
name: String,
username: String,
email: String,
});
// yaha per User ka naam hai jo ki collection ka naam banega
module.exports=mongoose.model('User', userSchema);
