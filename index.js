const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const mongodb = require("./config/connectionDB");



const userRouter = require("./Routes/User.route");
const category = require("./Routes/Categoriya.route");
const roomRoute = require("./Routes/Room.route");
const settinRoute = require("./Routes/setting.route");

mongodb();
app.use(cors());
app.use(express.json())
app.use(bodyParser.urlencoded({extended:true}));





app.use("/api/user", userRouter);
app.use("/api/category",category);
app.use("/api/room",roomRoute);
app.use("/api/setting",settinRoute);
app.post("/sinov",async(req,res)=>{
    res.json({messgae:"success"})
})

app.get("/api/Test", (req, res) => {
    res.send("Server is running");
});


const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log("server is running on "+PORT);
})

