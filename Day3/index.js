// routing and routes (request & response) in Express.js
// Express.js is a web application framework for Node.js, designed for building web applications and APIs
const express = require('express');
const app = express();
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

// creating Routes  
app.get('/', (req, res) => {
    res.send('Home Page - Welcome to Express!');
});
app.get('/product ', (req, res) => {
    res.send('About Page');
});
app.get('/news', (req, res) => {
    res.send('news Page');
});
// dynamic params
app.get('/news/:id', (req, res) => {
    let currentId = req.params.id; // params ki value access karne ke liye.
    res.send('news Page'+ currentId);
});

app.post('/login', (req, res) => {
    console.log(req);
        // send response (backend to frontend) with status code 200 and JSON data

    res.status(200).json({
        status: 'success',
        msg: 'Login successful',
    });
// send response using res.send() method
    // res.send({
    //     status: 'success',
    //     msg: 'Login successful',

    //     bodyData:req.body, // body ka data json se ata hai.body ka data json me jata hai.
    //     paramsData:req.params, // params ka data url se ata hai. mostly used in dynamic
    //     queryData:req.query, // query ka data urls se ata hai.mostly used in searching case.
    // });
});
app.listen(3000);



