const { regfun, logfun } = require("../Controller/userController");

const userrouter = require("express").Router();

userrouter.post("/register", regfun);
userrouter.post("/login", logfun);

module.exports = userrouter;