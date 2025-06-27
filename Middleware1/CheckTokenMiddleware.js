// let myToken = '12345';
//const env= require('dotenv').config(); // Load environment variables from .env file


let checkToken = (req, res, next) => {
    if (req.query.token == "" || req.query.token == undefined) {
        return res.send({
            status: '0',
            msg: 'Token is required',
        })
    }
    if (req.query.token != process.env.myToken) {
        return res.send({
            status: '0',
            msg: 'Token is invalid',
        })
    }
    next(); // Call next() to pass control to the next middleware or route handler
}

module.exports = { checkToken}; // Exporting the middleware functions for use in other files