const enquiryModel = require('../../models/enquiry.model.js');

let enquiryInsert=(req, res)=>{
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
    })}
// read
    let enquiryList = async (req, res) => {
        let enquiry = await enquiryModel.find();
        res.status(200).json({ status: 1, message: "Enquiry List", enquiryList: enquiry })
    }
    //delete
    let enquiryDelete = async (req, res) => {
        const userId = req.params.id;
        let deletedData = await enquiryModel.findByIdAndDelete({ _id: req.params.id });
        res.send({
            status: 1,
            message: "Enquiry deleted successfully",
            data: deletedData
        })
    }
module.exports={enquiryInsert, enquiryList, enquiryDelete} 
