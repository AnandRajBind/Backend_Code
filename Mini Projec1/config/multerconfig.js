const multer = require('multer');// for handling file uploads
const path = require('path');// for handling file paths
const crypto = require('crypto');// for generating random file names

// disk Storage 
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


module.exports=upload;
