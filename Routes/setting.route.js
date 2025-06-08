const route = require('express').Router();
const {setting,getInfoSetting} = require("../controller/setting.controller");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

route.post("/update",upload.single("image"),setting);
route.get("/getInfoSetting",getInfoSetting)

module.exports = route;