const express=require('express');
const app=express();
const path=require('path');

const userModel=require('./models/user'); // Import the user model
const e = require('express');
// Connect to MongoDB (make sure MongoDB is running on the default port)

// Middleware to parse JSON and URL-encoded bodies

app.use(express.json());  
app.use(express.urlencoded({extended:true}));  
// Set EJS as the view engine
app.set('view engine', 'ejs'); 

app.use(express.static(path.join(__dirname, 'public'))); // Serve static files from the 'public' directory
app.get('/', (req,res)=>{
    // ejs use huwa hai isliye send ko render se replace ker diya gaya hai.
    res.render('index.ejs');
});


app.get('/read', (req, res) => {
    res.render('read.ejs')
})
app.post('/create', async (req, res) => {
 
    let({name,email,image})=req.body; // 
const createdUser=await userModel.create({
name,
email,
image,
});
res.send(createdUser)
});


app.listen(3000);

