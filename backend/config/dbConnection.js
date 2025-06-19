const mongoose = require("mongoose");
require('dotenv').config();

const ConnectDB = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to the MongoDB");
    }
    catch(error){
        console.error("Unable to connect to the MongoDB");
        process.exit(1);
    }
}

module.exports = ConnectDB;