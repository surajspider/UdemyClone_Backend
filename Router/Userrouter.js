const { regfun, logfun, userauth, storeCoursesBought, getBoughtCourses } = require("../Controller/userController");
const auth = require("../Middleware/auth");

const userrouter = require("express").Router();

userrouter.post("/register", regfun);
userrouter.post("/login", logfun);
userrouter.get("/auth", auth, userauth);
userrouter.post("/coursesbought", storeCoursesBought);
userrouter.get("/getboughtcourses", getBoughtCourses);

module.exports = userrouter;