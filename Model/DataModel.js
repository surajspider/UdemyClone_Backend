const mongoose = require("mongoose");

const dataSchema = mongoose.Schema({
    "id": {
        type: Number,
        required: true
    },
    "courseName": {
        type: String,
        required: true
    },
    "image": {
        type: String,
        required: true
    },
    "creator": {
        type: String,
        required: true
    },
    "category": {
        type: String,
        required: true
    },
    "subcategory": {
        type: String,
        required: true
    },
    "rating": {
        type: Number,
        required: true
    },
    "hrs": {
        type: Number,
        required: true
    },
    "lectures": {
        type: Number,
        required: true
    },
    "price": {
        type: Number,
        required: true
    },
    "offerPrice": {
        type: Number,
        required: true
    },
    "point1": {
        type: String,
        required: true
    },
    "point2": {
        type: String,
        required: false
    },
    "point3": {
        type: String,
        required: false
    }
})

const courseDatas = mongoose.model("courseDatas", dataSchema);

module.exports = { courseDatas };