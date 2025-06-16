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


app.get('/read', async (req, res) => {
const readUsers= await userModel.find();

    res.render("read.ejs", {users: readUsers}); // Pass the users to the EJS template
})
app.get('/delete/:id', async (req, res) => {
const users= await userModel.findByIdAndDelete({_id: req.params.id});

    res.redirect("/read"); // Pass the users to the EJS template
})


app.get('/edit/:userid', async (req, res) => {
 const user=await userModel.findOne({_id: req.params.userid})

res.render("edit",{user}); // Pass the user to the EJS template})
})


app.post('/update/:userid', async (req, res)=>{
  let {email, name, image}  =req.body; // Destructure the request body to get the user details
let user= await userModel.findOneAndUpdate({_id: req.params.userid}, {image, name, email}, {new: true});
    res.redirect('/read'); // Redirect to the read page after updating

})

app.post('/create', async (req, res) => {
let{name,email,image}=req.body; // 
const createdUser=await userModel.create({
name,
email,
image,
});
res.redirect("/read")
});


app.listen(3000);

