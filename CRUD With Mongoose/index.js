let express = require("express");
let mongoose = require("mongoose");
require("dotenv").config();
const enquiryModel = require("./models/enquiry.model");

let app = express();
app.use(express.json()); // to parse JSON bodies

// create
app.post('/api/enquiry-insert', (req, res) => {
  let { name, email, phone, message } = req.body;

  console.log("Received enquiry data:", name, email, phone, message);
  let enquiry = new enquiryModel({
    name, email, phone, message
  });
  enquiry.save().then(() => {
    res.send({
      status: 1,
      message: "Enquiry saved successfully"
    });
  }).catch((err) => {
    res.send({ status: 0, message: "Error while saving enquiry", error: err });
  })
})
// read 
app.get('/api/enquiry-list', async (req, res) => {
  let enquiryList = await enquiryModel.find();

  res.status(200).json({ status: 1, message: "Enquiry List", data: enquiryList })
})
// update
app.put('/api/enquiry-update/:id', async (req, res) => {
  let userId = req.params.id;
  let { name, email, phone, message } = req.body;
  let updateObj = {
    name, email, phone, message
  }
  let updatedData = await enquiryModel.findByIdAndUpdate({ _id: userId }, updateObj);
  res.status(200).json({ status: 1, message: "Enquiry updated successfully", data: updatedData });
})

// delete
app.delete('/api/enquiry-delete/:id', async (req, res) => {
  const userId = req.params.id;
  let deleteddata = await enquiryModel.findByIdAndDelete({ _id: req.params.id });
  res.send({
    status: 1,
    message: "Enquiry deleted successfully",
    data: deleteddata
  })
})

mongoose.connect(process.env.DBURL).then(() => {
  console.log("Database connected successfully");

  app.listen(process.env.port, () => {
    console.log("Server is running on port 3000");
  })
})