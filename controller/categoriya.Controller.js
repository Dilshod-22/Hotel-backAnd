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
 const { name, price, jihozlar,description } = req.body;
  const file = req.file;

  if (!name || !price || !file || !jihozlar) {
    return res.status(400).json({ error: "All fields are required" });
  }

  // Agar jihozlar JSON string bo‘lsa, uni arrayga parse qilamiz
  const parsedJihozlar = Array.isArray(jihozlar) ? jihozlar : JSON.parse(jihozlar);

  // Rasmni ImageKit'ga yuklaymiz
  const imageUpload =  await imagekit.upload({
    file: file.buffer, // Multer buferdan rasmni oladi
    fileName: file.originalname,
  });

  // Yangi category yaratamiz
  const newCategory = await Category.create({
    name,
    price,
    image: imageUpload.url,
    jihozlar: parsedJihozlar,
    description
  });

  res.status(201).json({
    message: "Category created successfully",
    category: newCategory
  });
});


// 🟡 UPDATE category
const updateCategory = expressAsyncHandler(async (req, res) => {
const { name, price, jihozlar ,description} = req.body;
const file = req.file;
const categoryId = req.params.id;

if (!categoryId || !name || !price || !jihozlar) {
  return res.status(400).json({ error: "All fields are required" });
}

// Avval kategoriya mavjudligini tekshiramiz
const category = await Category.findById(categoryId);
if (!category) {
  return res.status(404).json({ error: "Category not found" });
}

// Agar jihozlar JSON string bo‘lsa, uni arrayga parse qilamiz
const parsedJihozlar = Array.isArray(jihozlar) ? jihozlar : JSON.parse(jihozlar);

// Kategoriyani yangilash uchun ma’lumotlarni tayyorlaymiz
const updateData = {
  name,
  price,
  jihozlar: parsedJihozlar,
  description
};

// Agar yangi rasm yuklangan bo‘lsa, eski rasm bilan solishtiramiz
if (file) {
  const imageUpload = await imagekit.upload({
    file: file.buffer, // Multer buferdan rasmni oladi
    fileName: file.originalname,
  });

  // Agar yuklangan rasm URL’isi eski rasm URL’idan farq qilsa, yangilaymiz
  if (imageUpload.url !== category.image) {
    updateData.image = imageUpload.url;
  }
}

// Kategoriyani yangilaymiz
const updatedCategory = await Category.findByIdAndUpdate(categoryId, updateData, { new: true });

res.status(200).json({
  message: "Category updated successfully",
  category: updatedCategory
});

});

const getAllCategoriya = expressAsyncHandler(async (req, res) => {
    const categories = await Category.find().sort({ createdAt: 1 });

    const formatted = categories.map((category, index) => ({
        id: category._id,
        name: category.name,
        image: category.image,
        jihozlar: category.jihozlar,
        price: category.price,
        createdAt: category.createdAt
    }));

    res.status(200).json(formatted);
});

const getAllCategoriya2 = expressAsyncHandler(async (req, res) => {
  const categories = await Category.find().sort({ createdAt: 1 });

  const formatted = categories.map((category, index) => ({
    id: category._id, // 1, 2, 3 kabi bo'ladi
    name: category.name,
    image: category.image,
    jihozlar: category.jihozlar,
    price: category.price,
    createdAt: category.createdAt.toISOString(), // ISO format string
  }));

  res.status(200).json(formatted);
});

const deleteCategory = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  

  try {
    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return res.status(404).json({ message: "Category not found!" });
    }

    res.status(200).json({ message: "Category deleted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});



module.exports = {
  createCategory,
  getAllCategoriya2,
  updateCategory,
  getAllCategoriya,
  deleteCategory
};
