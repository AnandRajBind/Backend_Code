const express = require('express');
const { dbConnection } = require('./dbConnection');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/student-read', async (req, res) => {
    let myDB = await dbConnection(); // Connect to the database
    let studentCollection = myDB.collection("Student_Collection"); // create or get collection

    let data = await studentCollection.find().toArray(); // Fetch all documents from the collection
    let resObj = {
        status: '1',
        msg: 'Student Read API',
        data
    }
    res.send(data);
});
app.post('/student-insert', async (req, res) => {
    let myDB = await dbConnection();// Connect to the database
    let studentCollection = myDB.collection("Student_Collection");// create or get collection

    // obj={
    // name:req.body.name,
    // email:req.body.email,
    // }

    let { name, email } = req.body; // Destructuring to get name and email from request body
    let obj = { name, email }; // Create an object with name and email

    let insertRes = await studentCollection.insertOne(obj); // Insert the object into the collection

    console.log(obj);
    let resObj = {
        status: '0',
        msg: "Data Insert API",
        insertRes
    }
    res.send(resObj); // Send the response back to the client
});
app.listen(3000);