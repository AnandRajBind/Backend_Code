const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userModel = require('./models/user');
const postModel = require('./models/post');
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());


app.get('/', (req, res) => {
    res.render('index');
})
app.get('/login', (req, res) => {
    res.render('login');
})
app.post('/register', async (req, res) => {
    let { email, password, username, name, age } = req.body;
    let existEmail = await userModel.findOne({ email });
    if (existEmail) return res.status(500).send('Email already exists');
    bcrypt.genSalt(10, async (err, salt) => {
        bcrypt.hash(password, salt, async (err, hash) => {
            let user = await userModel.create({
                username,
                email,
                age,
                name,
                password: hash
            });
            let token = jwt.sign({ email: email, userid: user._id }, "seceretKey")
            res.cookie('token', token);
            res.send("User registered successfully");
        })
    })
});
app.listen(3000);

