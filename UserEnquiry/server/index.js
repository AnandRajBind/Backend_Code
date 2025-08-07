let express = require('express');
let mongoose = require('mongoose');
const cors = require('cors');
const enquiryRouter = require('./App/routes/web/enquiryRouts');
require('dotenv').config();
let app = express();
app.use(cors());

app.use(express.json());

// routes
app.use('/api/website/enquiry', enquiryRouter)
// connect to mongoDB
mongoose.connect(process.env.DBURL).then(() => {
    console.log("Connected to MongoDB");
    app.listen(process.env.PORT || 3000, () => {
        console.log(`Server is running on port ${process.env.PORT || 3000}`);
    });
}).catch((err) => {
    console.error("Error connecting to MongoDB:", err);
});