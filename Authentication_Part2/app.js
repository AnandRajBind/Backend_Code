/*
create user account
mongoose 
schema 
model 
usercreate->passowrd-> hash
jwt token-> cookie
login-> token-> decrypt -> email
*/

// npm init -y
// npm i express jsonwebtoken bcrypt cookie-parser mongoose

const express = require('express')
const app = express();
const cookieParser=require('cookie-parser')
const path= require('path');

const userModel= require('./models/user.js');

// form data parsing
app.use(express.json());
app.use(express.urlencoded({extended: true}))
// cookie parsing
app.use(cookieParser());
// static files
app.use(express.static(path.join(__dirname, 'public')));
// view engine
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index.ejs');
})
app.post('/create',async (req, res) => {
    let{ username, email, password , age } = req.body;
let createdUser=await userModel.create({
username,
email,
password,
age
})
res.send(createdUser);
})
app.listen(3000);

