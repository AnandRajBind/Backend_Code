// routing and routes (request & response) in Express.js
// Express.js is a web application framework for Node.js, designed for building web applications and APIs
const express = require('express');
const app = express();
const env= require('dotenv').config(); // Load environment variables from .env file
const { checkToken } = require('./checkTokenMiddleware'); // Fixed path

  // express.json() is a built-in middleware function in Express.js that parses incoming requests with JSON
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies


//console.log(process.env.myToken) // Accessing the environment variable from .env file

// Application level middleware (custom middleware) 

// ***************************first middleware************************* 

/*
let myToken = '12345';
let checkTokens = (req, res, next) => {
    if (req.query.token == "" || req.query.token == undefined) {
        return res.send({
            status: '0',
            msg: 'Token is required',
        })
    }

    if (req.query.token != myToken) {
        return res.send({
            status: '0',
            msg: 'Token is invalid',
        })
    }
    next(); // Call next() to pass control to the next middleware or route handler
}
app.use(checkTokens); // Using the middleware in the app

*/
//**********************  second middleware *********************************

/*
let myPass = '123';
app.use((req, res, next) => {
    if (req.query.pass == "" || req.query.pass == undefined) {
        return res.send({
            status: '0',
            msg: 'Password is required',
        })
    }
    if (req.query.pass != myPass) {
        return res.send({
            status: '0',
            msg: 'Password is invalid',
        })
    }
    next();
})
*/
// creating Routes  
app.get('/', (req, res) => {
    res.send('Home Page - Welcome to Express!');
});
// route level middelware 
app.get('/news', checkToken ,(req, res) => {
    res.send('news Page');
});

app.get('/product', (req, res) => {
    res.send('About Page');
});

// dynamic params
app.get('/news/:id', (req, res) => {
    let currentId = req.params.id; // params ki value access karne ke liye.
    res.send('news Page' + currentId);
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

app.listen(process.env.PORT || '5000');




