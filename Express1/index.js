const express = require('express');// require/call express

const app = express(); // create app using express

// frontend to backend me data 3 types se send kiya jata hai.
/*
1. JSON Data - Body parameter 
2. Query Data- URL 
3. param - Dynamic Data 
*/

//  built-in-middleware
app.use(express.json());//if app is used to json data.Then it will be compulsory.

// custom Middleware 
const checkToken=(req,res,next)=>{
console.log("Middllware");
next(); // after checking the token forward the next URL 
}
app.use(checkToken); // middleware call 

// get method data is show the directly  browser while post method it will be not allow.
app.get('/', (req, res) => {
    res.send({ status: 1, "message": "Welcome to first express Server" })
})
app.get('/news', (req, res) => {
    res.send({ status: 1, "message": "Welcome to news page" })
})
app.get('/news/:id', (req, res) => {
    let currentId = req.params.id
    res.status(200).json({ 
        status: 1, 
        "message": "News Details API",
         id: currentId 
    })
    // res.send({ 
    //     status: 1, 
    //     "message": "News Details API",
    //      id: currentId 
    // })
})

// it is used basically used in form data.
app.post('/login', (req, res) => {
    // console.log(req);
    console.log(req.body);
    res.send(
        {
            status: 1,
            "message": "Welcome to  login page",
            bodyData: req.body,
            queryData: req.query

        })
})
app.listen("3000");