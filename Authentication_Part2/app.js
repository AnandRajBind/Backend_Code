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
const cookieParser = require('cookie-parser')
const path = require('path');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const userModel = require('./models/user.js');

// form data parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// cookie parsing
app.use(cookieParser());
// static files
app.use(express.static(path.join(__dirname, 'public')));
// view engine
app.set('view engine', 'ejs');
app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/create', (req, res) => {
    let { username, email, password, age } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let createdUser = await userModel.create({
                username,
                email,
                password: hash,
                age
            });
            let token = jwt.sign({ email }, "secretkey")
            res.cookie('token', token)
            res.send(createdUser);
        })
    })
});

app.get('/login', (req, res) => {
    res.render('login.ejs');
});
// invalid email hone per null hoga 
app.post('/login', async (req, res) => {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user)  return res.send(" Invalid email or password");

        // console.log(user.password);
    
    // password compare
    bcrypt.compare(req.body.password, user.password, function (err, result) {
        if (result) {
            let token = jwt.sign({email: user.email }, "secretkey")
            res.cookie('token', token)
            res.send("Yes You can loggin");
        }
        else  res.send("Invalid email or password");
    })
 });


app.get('/logout', (req, res) => {
    res.cookie('token', "");
    res.redirect('/');
});


app.listen(3000);

