const mongoose = require("mongoose");
require("dotenv").config();

module.exports.connect = async () => {
    try {
        mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected successfully!");
    } catch(Error) {
        console.log(Error);
    }
}
