const enquiryModel = require('../../models/enquiry.model.js');
//insert
let enquiryInsert = ((req, res) => {
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
//read
let enquirylist = async (req, res) => {
    let enquiryList = await enquiryModel.find();
    res.status(200).json({ status: 1, message: "Enquiry List", data: enquiryList })
}

//delete
let deleteEnquiry = async (req, res) => {
    const userId = req.params.id;
    let deleteddata = await enquiryModel.findByIdAndDelete({ _id: req.params.id });
    res.send({
        status: 1,
        message: "Enquiry deleted successfully",
        data: deleteddata
    })
}
let updateEnquiry = async (req, res) => {
    let userId = req.params.id;
    let { name, email, phone, message } = req.body;
    let updateObj = {
        name, email, phone, message
    }
    let updatedData = await enquiryModel.findByIdAndUpdate({ _id: userId }, updateObj);
    res.status(200).json({ status: 1, message: "Enquiry updated successfully", data: updatedData });
}
module.exports = { enquiryInsert, enquirylist, deleteEnquiry, updateEnquiry }
