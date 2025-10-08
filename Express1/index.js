const express=require('express');// require/call express

const app=express(); // create app using express

// frontend to backend me data 3 types se send kiya jata hai.
/*
1. JSON Data - Body parameter 
2. Query Data- URL 
3. param - Dynamic Data 
*/

app.use(express.json);// if app is used to json data.Then it will be compulsory.


// get method data is show the directly  browser while post method it will be not allow.
app.get('/',(req,res)=>{
    res.send({status:1, "message":"Welcome to first express Server"})
})
app.get('/about',(req,res)=>{
    res.send({status:1, "message":"Welcome to about page"})
})

// it is used basically used in form data.
app.post('/login',(req,res)=>{
    res.send({status:1, "message":"Welcome to  login page"})
})

app.listen("5000");