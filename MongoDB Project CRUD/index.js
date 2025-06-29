const express = require('express');
const { dbConnection } = require('./dbConnection');
const { ObjectId } = require('mongodb');
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


    // same email validation
    let checkEmail = await studentCollection.findOne({ email })
    if (checkEmail) {
        return res.send({
            status: '0',
            msg: "Email already exists"
        })
    }
    let insertRes = await studentCollection.insertOne(obj); // Insert the object into the collection

    console.log(obj);
    let resObj = {
        status: '0',
        msg: "Data Insert API",
        insertRes
    }
    res.send(resObj); // Send the response back to the client
});

app.delete("/delete/:id", async (req, res) => {
    let db = await dbConnection();
    let studentCollection = db.collection("Student_Collection");
    let { id } = req.params
    console.log(id);
    let delRes = await studentCollection.deleteOne({ _id: new ObjectId(id) });
    let resObj = {
        status: '0',
        msg: "Data delete API",
        delRes
    }
    res.send(resObj);
})



app.put("/update/:id", async (req, res) => {
    let { id } = req.params
    let { name, email } = req.body; // Destructuring to get name and email from request body


    let obj = {}; // data to update
// empty object validation
    if (name !== "" && name !== undefined && name !== null) {
        obj['name'] = name
    }
    if (email !== "" && email !== undefined && email !== null) {
        obj['email'] = email
    }

    console.log(obj);

    let myDB = await dbConnection();
    let studentCollection = myDB.collection("Student_Collection");

    let updateRes = await studentCollection.updateOne({ _id: new ObjectId(id) }, { $set: obj }); // Update the document with the specified id

    let resObj = {
        status: '0',
        msg: "Data update API",
        updateRes
    }
    res.send(resObj); // Send the response back to the client
})
app.listen(3000);
