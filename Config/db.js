const clouddb = "mongodb+srv://ramsuraj14:surajMongodb@cluster0.0sb3xgb.mongodb.net/UdemyClone_Project?retryWrites=true&w=majority";
const mongoose = require("mongoose");
mongoose.set("strictQuery", true);

const connection = async () => {
    try {
        await mongoose.connect(clouddb);
        console.log("Connection made Successfully");
    }
    catch (err) {
        console.log("Error Occurred during db connection", err);
    }
}

module.exports = connection;