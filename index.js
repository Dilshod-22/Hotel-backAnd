const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongodb = require("./config/connectionDB");



const userRouter = require("./Routes/UserRoute.route");




mongodb();
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));





app.use("/api/user", userRouter);

app.get("/Test", (req, res) => {
    res.send("Server is running");
});


const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log("server is running on "+PORT);
})

