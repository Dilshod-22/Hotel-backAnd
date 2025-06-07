const Category = require("../models/categoryModel");
const expressAsyncHandler = require("express-async-handler");
const ImageKit = require("imagekit");

// ImageKit konfiguratsiyasi
const imagekit = new ImageKit({
  publicKey: 'public_rAybsQad4S9MYw+BKkmoRhSqD/I=',
  privateKey: 'private_TSz93gxCDXt8uvllKTuxKwJL7a4=',
  urlEndpoint: 'https://ik.imagekit.io/qk82mhvi8',
});


// 🟢 CREATE category
const createCategory = expressAsyncHandler(async (req, res) => {
  const { name, jihozlar, price } = req.body;
  const file = req.file;

  if (!file) {
    res.status(400);
    throw new Error("Image file is required");
  }

  // ImageKit orqali rasm yuklash
  const uploadResponse = await imagekit.upload({
    file: file.buffer, // Multer buferdan rasmni oladi
    fileName: file.originalname,
  });

  const newCategory = new Category({
    name,
    jihozlar,
    price,
    image: uploadResponse.url,
  });

  const savedCategory = await newCategory.save();
  res.status(201).json(savedCategory);
});


// 🟡 UPDATE category
const updateCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, jihozlar, price } = req.body;
  const file = req.file;

  const category = await Category.findById(id);
  if (!category) {
    res.status(404);
    throw new Error("Category not found");
  }

  // Agar yangi rasm yuborilgan bo‘lsa, ImageKit’ga yuklash
  let imageUrl = category.image;
  if (file) {
    const uploadResponse = await imagekit.upload({
      file: file.buffer,
      fileName: file.originalname,
    });
    imageUrl = uploadResponse.url;
  }

  category.name = name || category.name;
  category.jihozlar = jihozlar || category.jihozlar;
  category.price = price || category.price;
  category.image = imageUrl;

  const updated = await category.save();
  res.status(200).json(updated);
});

module.exports = {
  createCategory,
  updateCategory,
};
