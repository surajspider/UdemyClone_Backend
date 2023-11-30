const express = require("express");
const app = express();
const PORT = 4500;
const cors = require("cors");
const userrouter = require("./Router/Userrouter");
const connection = require("./Config/db");
const datarouter = require("./Router/DataRouter");

app.use(cors({
    origin: "*"
}))
app.use(express.json());
app.get("/", (req, res) => {
    res.send("This is Home Page!");
    console.log("Home!");
})

app.use("/api", userrouter);
app.use("/data", datarouter);

app.listen(PORT, async () => {
    try {
        await connection();
        console.log("Application is running on PORT", PORT);
    }
    catch (err) {
        console.log("Error Occurred during Listening Port", err);
    }
});
