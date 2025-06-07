const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  image: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  jihozlar: {
    type: [String], // jihozlar – stringlardan iborat massiv
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true // yaratilgan va yangilangan vaqtni avtomatik qo‘shadi
});

module.exports = mongoose.model('Category', categorySchema);
