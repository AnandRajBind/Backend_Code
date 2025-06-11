// initlize a project with npm. (npm init -y) 
// express install.(npm i express)

// setting up parser for form. 

//setting up ejs for ejs pages.(npm i ejs)

 /*
 install ejs from npm 
setup ejs as a view engine 
 */

//setting up public static files.
//public folder ke ander js, css and imageses jo hoti hai vo static files hoti hai.
// dynamic routing.
//how to get data coming from frontend at backend route.
// *******************************************************************************************************************************
//EJS just like html but it is perform the additional operation like: <h1> 2+2 </h1>. ans 4 according to EJS and 2+2 according to html.
//*********************************************************************************************************************************** */
/* path name ka package by default nodejs me install hota hai.
 console.log(__dirname + '/public');// current directory ka path + jo add karna hai.
const path=require('path');
console.log(path.join(__dirname,'public'));
*/


const express=require("express");
const app=express();
const path=require('path');
// setting up parser for form.
app.use(express.json());
app.use(express.urlencoded({extended:true}));
// setup ejs as a view engine 
app.set('view engine ', 'ejs');// itska mtlb hai hamra backend kya render karega. jo ki ejs hai. jab ham ejs ka use karte hai to send message ko replace ker date hai render(EJSfileName) method se. 
//setting up  static files.

app.use(express.static(path.join(__dirname, 'public')));//current directory ka path + jo add karna hai.

app.get("/",function(req,res){
    res.render("index.ejs")
})
 
app.listen(3000);
