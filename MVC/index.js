let express = require("express");
let mongoose = require("mongoose");
require("dotenv").config();
const enquiryModel = require("./App/models/enquiry.model");
const { enquiryInsert, enquirylist, deleteEnquiry, updateEnquiry } = require('./App/controller/web/userEnquiryController');
const enquiryRoutes = require("./App/routes/web/enquiryRoutes");


let app = express();
app.use(express.json()); // to parse JSON bodies

app.use("/web/api/enquiry", enquiryRoutes)

mongoose.connect(process.env.DBURL).then(() => {
  console.log("Database connected successfully");

  app.listen(process.env.port, () => {
    console.log("Server is running on port 3000");
  })
})