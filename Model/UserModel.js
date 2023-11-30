const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    uname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    pass: {
        type: String,
        required: true
    }
});

const useraccounts = mongoose.model("useraccounts", userSchema);

module.exports = { useraccounts };