const settingModel = require("../models/SettingModel");
const expressAsyncHandler = require("express-async-handler")
const ImageKit = require("imagekit");

// ImageKit konfiguratsiyasi
const imagekit = new ImageKit({
  publicKey: 'public_rAybsQad4S9MYw+BKkmoRhSqD/I=',
  privateKey: 'private_TSz93gxCDXt8uvllKTuxKwJL7a4=',
  urlEndpoint: 'https://ik.imagekit.io/qk82mhvi8',
});


const setting = expressAsyncHandler(async(req,res)=>{
    const { name, contact } = req.query;
    const file = req.file;

    if (!name && !contact && !file) {
    return res.status(400).json({ error: "At least one field is required to update" });
    }

    // Yangilash uchun ma’lumotlarni tayyorlaymiz
    const updateData = {};
    if (name) updateData.name = name;
    if (contact) updateData.contact = contact;

    // Agar yangi rasm yuklangan bo‘lsa, ImageKit'ga yuklaymiz
    if (file) {
    const imageUpload = await imagekit.upload({
        file: file.buffer, // Multer buffer orqali rasmni oladi
        fileName: file.originalname,
    });

    updateData.image = imageUpload.url;
    }

    // Bazadagi bitta `Setting` ma’lumotini yangilaymiz
    const updatedSetting = await settingModel.findOneAndUpdate({}, updateData, { new: true });

    if (!updatedSetting) {
    return res.status(404).json({ error: "Setting not found" });
    }

    res.status(200).json({
    message: "Setting updated successfully",
    setting: updatedSetting
    });
})

const getInfoSetting = expressAsyncHandler(async(req,res)=>{
    const infoSetting = await settingModel.find();
    res.status(200).json(infoSetting);
})

module.exports = {
    setting,
    getInfoSetting
};