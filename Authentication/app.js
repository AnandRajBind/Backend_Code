// Authentication & Authorization 
//Cookies, kaise set karte hain.
// bcrypt kaise use karte hai for password encryption and decryption 
// jwt kya hai and jwt me data kaise store kare and bahaar nikaale
// npm init -y
// install nmp i jsonwebtoken bcrypt express


const express= require('express');
const app= express();
const cookieParser = require('cookie-parser');
// cookie-parser is a middleware that parses cookies attached to the client request object.
app.use(cookieParser());


// jab ham browser se kisi bhi route per jayenge to cookies sath me by default chipak ker jayegi while authorization header(alag se chipkana padta hai request me) me aisa nhi hota hai.

app.get('/', (req, res) => {
    // Set a cookie named 'username' with the value 'anand'.server se browser per data sava kara dena cookies bolte hai.
    res.cookie('username' , 'anand')
    res.send('home page ');
})
app.get('/read', (req, res) => {
    //read cookies
    console.log(req.cookies);
    res.send('read page ');
})
app.listen(3000);
