const express = require('express');
const app = express();

// request and response are the two main objects in express.js.
// request is used to get the data from the client and response is used to send the data to the client. 

// middlware  is a element between server accept the request and before it send the resonse to the routes/client.

app.use(function (req, res, next) {
    console.log('Middleware function executed');
    //   res.send('Middleware function executed'); 
    // Send a response to the client
     // You can perform any operations here, like logging, authentication, etc.
    next(); // Call the next middleware or route handler
});
app.use(function (req, res, next) {
    console.log('Middleware function executed second time ');
    next(); // Call the next middleware or route handler
});

// creating Routes  
app.get('/', (req, res) => {
    res.send('Home Page - Welcome to Express!');
});
app.get('/about', (req, res) => {
    res.send('About Page');
});

// Simulating a route that might throw an error
app.get('/portfolio', (req, res, next) => {
    // res.send('portfolio  Page');
    return next(new Error('Portfolio page not found')); // Simulating an error
});

// error handling 
app.use((err, req,res, next)=>{
    console.error('Error occurred:', err.message);
    res.status(500).send('Internal Server Error');
});
// Start the server
app.listen(3000);



