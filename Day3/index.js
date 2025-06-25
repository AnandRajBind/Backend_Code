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
app.post('/login', (req, res) => {
    console.log(req);
    res.send({
        status: 'success',
        msg: 'Login successful',

        bodyData:req.body, // body ka data json se ata hai.
        queryData:req.query, // query ka data urls se ata hai.mostly used in searching case.
    });
});
app.listen(3000);



