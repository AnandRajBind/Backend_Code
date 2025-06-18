const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    postData: String,
    user: {
        type: mongoose.Schema.Types.ObjectId,
        // usermodel me jo id ayegi vo post model se belong karta hai.
        ref: 'user' // Reference to the User model
    },
    date: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('post', postSchema);
