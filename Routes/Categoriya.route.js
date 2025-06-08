const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const {
  createCategory,
  updateCategory,
  getAllCategoriya
} = require("../controller/categoriya.Controller");

// POST /api/categories
router.post("/create", upload.single("image"), createCategory);

// PUT /api/categories/:id
router.put("/update/:id", upload.single("image"), updateCategory);
router.get("/getCategory",getAllCategoriya);
module.exports = router;
