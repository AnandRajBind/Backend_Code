const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/Association')
//  mongoose.connect('mongodb://127.0.0.1:27017/yourDatabaseName')

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    // posts ake array hai jiska type object id hai.
    posts: [
        {
            type: mongoose.Schema.Types.ObjectId,
            // usermodel me jo id ayegi vo post model se belong karta hai.
            ref: 'post' // Reference to the Post model
        }]
});
module.exports = mongoose.model('user', userSchema);