const fs = require('fs');

// create a new file
// if the file already exists, it will be overwritten
fs.writeFile("demo.txt", "Hello world", function (err) {
    if (err) {
        return console.log(err);
    }
    else {
        return console.log("File created successfully!");
    }
})

// append data to the file


fs.appendFile("demo.txt", " Ap sb kaise hai", function (err) {
    if (err) {
        return console.error(err);
    }
    else {
        return console.log("File append successfully!");
    }
})

// rename file 
fs.rename("demo.txt", "newName.txt", function (err) {
    if (err) {
        return console.error(err);
    }
    else {
        return console.log("rename successful");
    }
})

// copy file 
fs.copyFile("newName.txt", "./copy/copy.txt", function (err) {
    if (err) console.log(err.message);
    else return console.log("copy successful");
})

// delete file 
fs.unlink("newName.txt", function (err) {
   if(err) return console.log(err);
    else {
        return console.log("File deleted successfully");
    }
})

// remove directory/folder bydefault empty folder ko hi delete karta hai.
// non-empty folder ko remove karne ke liye ham recursive object ko true {recursive: true } ker denge. jo ki bydefault false hota hai.
fs.rm("./copy",{recursive:true}, function(err){
    if(err) return console.log(err.message);
    else return console.log("remove directory")
})
