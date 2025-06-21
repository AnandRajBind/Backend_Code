const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
const multer=require('multer')

const userModel = require('./models/user');
const postModel = require('./models/post');
app.set('view engine', 'ejs');

 const crypto=require('crypto');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser());


const storage=multer.diskStorage({
    destination: function(req, file, cb){
        cb(null,'./public/images/upload');
    },

    filename: function(req, file, cb){
        crypto.randomBytes(12, function(err, bytes){
            const fn= bytes.toString("hex")+path.extname(file.originalname);
            cb(null, fn);
        })
    }
})
const upload =multer({storage: storage});

app.get('/', (req, res) => {
    res.render('index');
})
app.get('/test', (req, res) => {
    res.render('test');
})
app.post('/upload', upload.single('image'), (req, res) => {
    console.log(req.file);

    res.send("File uploaded successfully");
})


app.get('/login', (req, res) => {
    res.render('login')
})

app.get('/profile', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email }).populate('posts');
    console.log(user.posts);
    res.render('profile', { user })
})

app.get('/like/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate('user');

    if(post.likes.indexOf(req.user.userid)=== -1){
        post.likes.push(req.user.userid)
    }
    else{

        post.likes.splice(post.likes.indexOf(req.user.userid),1);
    }
     await post.save();
     res.redirect('/profile' )
})
app.get('/edit/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOne({ _id: req.params.id }).populate('user');
    // await post.save();
     res.render('edit', { post})
})
app.post('/update/:id', isLoggedIn, async (req, res) => {
    let post = await postModel.findOneAndUpdate({ _id: req.params.id },{content:req.body.content});
    // await post.save();
     res.redirect('/profile')
})
app.post('/post', isLoggedIn, async (req, res) => {
    let user = await userModel.findOne({ email: req.user.email });
    let { content } = req.body
    let post = await postModel.create({
        user: user._id,
        content
    })
    user.posts.push(post._id);
    await user.save();
    res.redirect('/profile');
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
            res.redirect("/profile");
        })
    })
});

app.post('/login', async (req, res) => {
    let { email, password } = req.body
    let user = await userModel.findOne({ email });
    if (!user) return res.status(500).send("Something went wrong")
    bcrypt.compare(password, user.password, function (err, result) {
        if (result) {
            let token = jwt.sign({ email: email, userid: user._id }, "seceretKey")
            res.cookie('token', token);
            res.status(200).redirect('/profile');
        }
        else res.redirect("/login")
     })
});

app.get('/logout', (req, res) => {
    res.cookie('token', "");
    res.redirect('/login')
})
// middleware for protected routes (yadi ham kisi profile per hai aur login nhi hai to hame redirect ker de login page per isi ko protected route bolte hain) 
function isLoggedIn(req, res, next) {
    if (req.cookies.token === "") res.render('/login');
    else {
        let data = jwt.verify(req.cookies.token, 'seceretKey');
        req.user = data; // store user data in request object
    }
    next();
}

app.listen(3000);


