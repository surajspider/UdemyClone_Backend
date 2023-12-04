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
const userauth = async (req, res) => {
    const user = req.user;
    console.log(user);
    if (user && user.useremail) {
        try {
            const userinfo = await useraccounts.findOne({ email: user.useremail });
            if (userinfo) {
                res.send({ msg: "User Authorized", userdata: userinfo })
            }
            else {
                res.status(404).send("User not found");
            }
        }
        catch (err) {
            console.log("Error fetching user detail from db:", err);
        }
    }
    console.log("user authorized!");
}

const storeCoursesBought = async (req, res) => {
    const { cartData, userData } = req.body;

    try {
        // Find the user account based on the email
        let userAccount = await useraccounts.findOne({ email: userData });

        if (!userAccount) {
            // If user doesn't exist, create a new user with the bought courses
            userAccount = new useraccounts({
                email: userData,
                boughtCourses: cartData,
            });

            await userAccount.save();
        } else {
            // If user exists, add the new courses to the existing boughtCourses array
            userAccount.boughtCourses = [...userAccount.boughtCourses, ...cartData];
            await userAccount.save();
        }

        res.status(200).json({ msg: 'Courses bought and stored successfully' });
    } catch (error) {
        console.error('Error storing courses bought:', error);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

const getBoughtCourses = async (req, res) => {
    const userID = req.query.userID;
    try {
        const user = await useraccounts.findOne({ email: userID });

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }
        const boughtCourses = user.boughtCourses || [];

        return res.status(200).json({ success: true, boughtCourses });
    } catch (error) {
        console.error('Error fetching bought courses:', error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
}
module.exports = { regfun, logfun, userauth, storeCoursesBought, getBoughtCourses };