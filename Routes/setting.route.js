const Route = require("express").Route();
const {setting,getInfoSetting} = require("../controller/setting.controller");
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

Route.get("/update",upload.single("image"),setting);
Route.get("/getInfoSetting",getInfoSetting)

module.exports = Route;