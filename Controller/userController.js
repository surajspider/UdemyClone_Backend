const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { useraccounts } = require("../Model/UserModel");
const secret_key = "suraj";

const regfun = async (req, res) => {
    const data = req.body;
    console.log(data);
    try {
        const findemail = await useraccounts.findOne({ email: data.email });
        if (findemail) {
            console.log(findemail);
            return res.send({ msg: "User Already Registered!" })
        }
        else {
            const saltround = bcrypt.genSaltSync(10);
            const hashpassword = bcrypt.hashSync(data.pass, saltround);
            console.log(hashpassword);
            const tempobj = {
                uname: data.uname,
                email: data.email,
                pass: hashpassword,
                contact: data.contact
            }
            const newuser = await useraccounts.create(tempobj);
            // const newUser = new userAccounts(tempobj);
            // await newUser.save();

            const token = jwt.sign({ email: data.email }, secret_key, { expiresIn: "360000" });
            console.log("Token:", token);
            res.send({ msg: "User Registered Successfully!", token: token });
            console.log(newuser);
        }
    }
    catch (err) {
        console.log("Error", err)
    }
}

const logfun = async (req, res) => {
    const logindata = req.body;
    const finduser = await useraccounts.findOne({ email: logindata.email });
    if (finduser) {
        console.log(finduser);
        const validate = bcrypt.compareSync(logindata.pass, finduser.pass);
        if (validate) {
            const token = jwt.sign({ useremail: logindata.email }, secret_key, { expiresIn: "360000" });
            console.log("token:", token);
            return res.send({ msg: "User Logged in Successfully!", token: token, userdetail: finduser });
        }
        else {
            return res.send({ msg: "User Password is Wrong!" });
        }
    }
    else {
        console.log("Email is not registered. Please Provide a valid email!");
        return res.send({ msg: "Email not registered!!" });
    }

}

module.exports = { regfun, logfun };