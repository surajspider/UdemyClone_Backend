const { courseDatas } = require("../Model/DataModel");
const data = require("../data");


const allcat = async (req, res) => {
    try {
        const insertedData = [];

        for (let i = 0; i < data.length; i++) {
            const result = await courseDatas.create(data[i]);
            insertedData.push(result);
        }
        res.send({ msg: "Inserted data Successfully!", data: insertedData });
    }
    catch (err) {
        console.log("Error in alldata:", err);
    }
}

const getalldata = async (req, res) => {
    try {
        const result = await courseDatas.find();
        res.send(result);
    }
    catch (err) {
        console.log("Error on fetching data from db:", err);
    }
}

const searchdata = async (req, res) => {
    const searchText = req.query.searchText;
    try {
        const result = await courseDatas.find({
            $or: [
                { courseName: { $regex: searchText, $options: "i" } },
                { category: { $regex: searchText, $options: "i" } },
                { subcategory: { $regex: searchText, $options: "i" } }
            ]
        })
        res.send(result);
    }
    catch (err) {
        console.log("Error in searching data:", err);
    }
}

module.exports = { allcat, getalldata, searchdata };