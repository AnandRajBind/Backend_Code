let express = require("express");
const { enquiryInsert, enquirylist, deleteEnquiry, updateEnquiry } = require('../../controller/web/userEnquiryController');

let enquiryRoutes = express.Router();


// create
enquiryRoutes.post('/enquiry-insert', enquiryInsert);
// read 
enquiryRoutes.get('/enquiry-list', enquirylist)
// update
enquiryRoutes.put('/enquiry-update/:id', updateEnquiry)

// delete
enquiryRoutes.delete('/enquiry-delete/:id', deleteEnquiry)

module.exports = enquiryRoutes;