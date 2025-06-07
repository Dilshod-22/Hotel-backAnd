// const express = require("express");
// const app = express();
// const dotenv = require("dotenv").config();
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const mongodb = require("./config/connectionDB");



// const userRouter = require("./Routes/User.route");
// const category = require("./Routes/Categoriya.route");



// mongodb();
// app.use(cors());
// app.use(express.json())
// app.use(bodyParser.urlencoded({extended:true}));





// app.use("/api/user", userRouter);
// app.use("/api/category",category);
// app.post("/somsa",async(req,res)=>{
//     res.json({message:"dabba"});
// })

// app.get("/Test", (req, res) => {
//     res.send("Server is running");
// });


// const PORT = process.env.PORT || 8000;

// app.listen(PORT,()=>{
//     console.log("server is running on "+PORT);
// })

const http = require('http');

const server = http.createServer((req, res) => {
  // Faqat POST va /somsa URL'ni tekshiramiz
  if (req.method === 'POST' && req.url === '/somsa') {
    let body = '';

    // Request body yig‘iladi
    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      // JSON formatda javob qaytariladi
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'dabba' }));
    });

  } else {
    // Boshqa endpointlarga 404
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Route not found' }));
  }
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});