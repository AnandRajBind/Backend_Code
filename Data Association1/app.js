const express = require('express');
const app = express();

const userModel = require('./models/user');
const postModel = require('./models/post');

app.get('/', (req, res) => {
    res.send('Hello World');
});
app.get('/create', async (req, res) => {
    let createdUser = await userModel.create({
        username: 'anand',
        email: 'anand@gmail.com',
        age: 25
    });
    res.send(createdUser);
});
app.get('/post/create', async (req, res) => {
    const post = await postModel.create({
        postData: "My First Post Here",
        user: "68524e04b48b8dc7c676e9f2"// post create karte time user id  de diya gaya to post ko pata hai ki uska user kaun hai.
    });

    // user ke post me post ka id push karna hai. aur post ko pata hona chahiye ki uska user kaun hai.
    let user = await userModel.findOne({ _id: "68524e04b48b8dc7c676e9f2" });
    user.posts.push(post._id);
    await user.save(); // save karne se user ke posts me post ka id add ho jayega.
    res.send({post, user});

});

app.listen(3000);




