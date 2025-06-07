const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage();
const upload = multer({ storage });

const {
  createCategory,
  updateCategory,
} = require("../controller/categoriya.Controller");

// POST /api/categories
router.get("/create", upload.single("image"), createCategory);

// PUT /api/categories/:id
router.get("/update/:id", upload.single("image"), updateCategory);

module.exports = router;
