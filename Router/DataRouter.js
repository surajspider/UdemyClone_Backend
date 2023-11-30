const { allcat, getalldata } = require("../Controller/dataController");

const datarouter = require("express").Router();

datarouter.post("/pushalldata", allcat);
datarouter.get("/fetchalldata", getalldata);

module.exports = datarouter;