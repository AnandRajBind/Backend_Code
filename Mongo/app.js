const express = require('express');
const app = express();

const userModel = require('./UserModel');
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// mongoose me create, read, update, delete or mongoose ke through karne wala koi bhi code asynchronous hota hai.
//js me pahale synchronous code chalaya jata hai uske bed hi asynchronous code chalaya jata hai.
// isliye agr ham chate hai ki pahale asynchronous code chale to iske liye  async await ka use karna padta hai. 
//await ka use karne ke liye function(nearest parent function) ko async banana padta hai.
app.get('/create', async (req, res) => {
    //asynchronous codez
    const createdUser = await userModel.create({
        name: 'Anurag',
        username: 'anuragraj',
        email: 'anandraj@gmail.com',
    })
    //synchronous code
    res.send(createdUser);
});


app.get('/update', async (req, res) => {
    // findOneAndUpdate is used to find a document and update it if it exists, or create a new one if it doesn't.
    // it is used to three parameter findOneUpdate(findone, update, {new: true}). third parameter is used to return the updated document.
    const updatedUser = await userModel.findOneAndUpdate({
        username: 'anandraj',
    },
        { name: "Vandana Bind" },
        { new: true }  // this will return the updated document
    )
    //synchronous code
    res.send(updatedUser);
});

app.get(`/read`, async (req, res) => {
    //Note: 
    const users = await userModel.find();// this will return all the documents in the collection.it is returning an array of documents.koi bhi data n milne per find() method empty array  [] return karega. while findOne() method null return karega.
    // const users = await userModel.findOne();// this will return the first document in the collection. it is object of document. 
    //const users = await userModel.find({ username: "anuragraj" });// this will return all the documents with username anuragraj


    res.send(users);
});
app.get('/delete', async (req, res) => {
    // deleteOne is used to delete a single document from the collection.
    // it will return the deleted document.
    const deletedUser = await userModel.findOneAndDelete({
        username: 'anuragraj',
    })
    res.send(deletedUser);
});
app.listen(100);

