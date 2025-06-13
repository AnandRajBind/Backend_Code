const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');// fs module available in core nodejs. it provides an API for interacting with the file system.

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Set the view engine to EJS
app.set('view engine', 'ejs');
// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    // reading task from the files folder using fs module. readdir('path',callback)
    // Read the files in the 'files' directory and pass them to the view.
    fs.readdir(`./files`, (err, files) => {
        res.render("index.ejs", { files: files });// reddir ka jab callback function call ho tab jaker response render hoga.yaha per render karte time ham views page per kuch bhi send ker sakta hu object ke roop me {files: files}. first files is denoted to kis name se ham files ko send ker rahe hai view page per and second files is the variable which we are sending to the view page. first files is key and second files is value.
    });
});
app.get('/file/:filename', (req, res) => {
    fs.readFile(`./files/${req.params.filename}`, "utf-8", function (err, fileData) {
        // console.log(fileData);
        // filename and filedata name se data jayega show name ke ejs file me.iske bad waha se data ko render karega frontend per.
        res.render('show',{filename:req.params.filename, fileData:fileData});
    })
}
)


// flow. read data from frontend using writefile()->send files to backend using ejs->render the index.ejs file and pass the files to it->display the files on the frontend using ejs.  
app.post('/create', (req, res) => {

    fs.writeFile(`./files/${req.body.title.split('').join('')}.txt`, req.body.details, function (err) {
        //    console.log(req.body);
        res.redirect('/');// redirect to the home page after creating a file.
    })
});

app.listen(3000);












