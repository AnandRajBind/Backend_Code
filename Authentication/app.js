// Authentication & Authorization 
//Cookies, kaise set and read  karte hain.
// bcrypt kaise use karte hai for password encryption and decryption 
// jwt kya hai and jwt me data kaise store kare and bahaar nikaale
// npm init -y
// install nmp i jsonwebtoken bcrypt express


const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
// cookie-parser is a middleware that parses cookies attached to the client request object.
const bcrypt = require('bcrypt');
app.use(cookieParser());
const jwt=require('jsonwebtoken');
// ***************************************************Cookies*******************************************


// jab ham browser se kisi bhi route per jayenge to cookies sath me by default chipak ker jayegi while authorization header(alag se chipkana padta hai request me) me aisa nhi hota hai.
// response se cookies set karte hain, aur request se cookies read karte hain.
/*
app.get('/', (req, res) => {
    // Set a cookie named 'username' with the value 'anand'.server se browser per data sava kara dena cookies bolte hai.
    res.cookie('username' , 'anand')
    res.send('home page ');
})

app.get('/read', (req, res) => {
    //read cookies
    console.log(req.cookies);
    res.send('read page ');
})

// ***************************************************Encryption*******************************************
// salt = random string, default number of rounds is 10, it can be changed
/*app.get('/', (req, res) => {
    bcrypt.genSalt(10, function (err, salt) {// generate salt
        bcrypt.hash('Anand@8726', salt, function (err, hash) {// hash the password (salt + hash password )
            console.log(hash);
        });
    });
});*/

// ***************************************************Decryption*******************************************
// hash- $2b$10$mnzi3Kxpp8ASWrIxKBvWzOZ/M52hWKLqA94J1Fk5l4TDu.3VfkiiO

/*
app.get('/bcrypt',function (req,res){
    bcrypt.compare('Anand@8726','$2b10$mnzi3Kxpp8ASWrIxKBvWzOZ/M52hWKLqA94J1Fk5l4TDu.3VfkiiO',function(err,result){
        console.log(result); // true if password matches, false otherwise

    })
})
*/

//  ***************************************************JWT*******************************************
// JWT - JSON Web Token is teen chijo se milker bana hota hai. first alogorithm(header), second data(payload), third signature(  secret key).
// token ko client ko bhej dena hai, client is token ko local storage me save kar lega, aur har request me is token ko bhej dega.
app.get('/jwt',function (req,res){
let token=jwt.sign({email: "anandrajbind@gmail.com"}, "secretkey");
res.cookie("token", token); // send the token to the client
res.send('JWT token generated and sent as cookie');
//console.log(token); // token is generated, it is a string
})
//   read jwt token from cookies
app.get('/readjwt',function (req,res){
    // console.log(req.cookies.token);
    let data=jwt.verify(req.cookies.token, "secretkey");
    console.log(data);
    
})


app.listen(3000);

 