const express = require("express");
const app = express();
const PORT = 4500;
const cors = require("cors");

app.use(cors({
    origin: "*"
}))

app.get("/", (req, res) => {
    res.send("This is Home Page!");
    console.log("Home!");
})

app.listen(PORT, () => {
    console.log("Application is running on PORT", PORT);
});
