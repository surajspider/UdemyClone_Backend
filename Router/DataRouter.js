const { allcat, getalldata, searchdata } = require("../Controller/dataController");

const datarouter = require("express").Router();

datarouter.post("/pushalldata", allcat);
datarouter.get("/fetchalldata", getalldata);
datarouter.get("/search", searchdata);

module.exports = datarouter;