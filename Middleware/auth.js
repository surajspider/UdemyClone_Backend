const jwt = require("jsonwebtoken");
const secret_key = "suraj";

const auth = (req, res, next) => {
    const BearerToken = req.headers["authorization"];
    console.log("this is bearer", BearerToken);
    if (BearerToken) {
        const token = BearerToken.split(" ")[1];
        try {
            const validate = jwt.verify(token, secret_key);
            if (validate) {
                req.user = validate;
                next();
            } else {
                console.log("User not authorized!");
            }
        } catch (error) {
            console.log("Error verifying token:", error.message);
            console.log("User not authorized!");
        }
    }
    else {
        console.log("User not allowed!");
    }
};

module.exports = auth;
