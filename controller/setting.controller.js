const settingModel = require("../models/SettingModel");
const expressAsyncHandler = require("express-async-handler")
const ImageKit = require("imagekit");

// ImageKit konfiguratsiyasi
const imagekit = new ImageKit({
  publicKey: 'public_rAybsQad4S9MYw+BKkmoRhSqD/I=',
  privateKey: 'private_TSz93gxCDXt8uvllKTuxKwJL7a4=',
  urlEndpoint: 'https://ik.imagekit.io/qk82mhvi8',
});


const setting = expressAsyncHandler(async (req, res) => {
    const { name, contact } = req.body;
    const file = req.file;

    if (!name && !contact && !file) {
        return res.status(400).json({ error: "Hech bo'lmaganda bitta maydon to'ldirilishi kerak" });
    }

    const updateData = {};
    if (name) updateData.name = name;

    if (contact) {
        try {
            updateData.contact = JSON.parse(contact);
        } catch (e) {
            return res.status(400).json({ error: "contact noto‘g‘ri formatda (JSON bo‘lishi kerak)" });
        }
    }

    if (file) {
        const imageUpload = await imagekit.upload({
            file: file.buffer,
            fileName: file.originalname,
        });
        updateData.image = imageUpload.url;
    }

    const updatedSetting = await settingModel.findOneAndUpdate(
        {},
        updateData,
        { new: true, upsert: true }
    );

    res.status(200).json({
        message: "Setting muvaffaqiyatli yangilandi yoki yaratildi",
        setting: updatedSetting
    });
});

const getInfoSetting = expressAsyncHandler(async(req,res)=>{
    const infoSetting = await settingModel.find();
    res.status(200).json(infoSetting);
})

module.exports = {
    setting,
    getInfoSetting
};