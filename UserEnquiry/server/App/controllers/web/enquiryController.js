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

module.exports={enquiryInsert}