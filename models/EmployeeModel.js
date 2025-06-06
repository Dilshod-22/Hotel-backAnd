const mongoose = require('mongoose');

const EmployeeSchema = new mongoose.Schema({
    fullName: { type: String, required: true },
    position: { type: String, enum: ['farrosh', 'kassir', 'administrator'], required: true },
    salary: { type: Number, required: true },
    hireDate: { type: Date, required: true },
    isActive: { type: Boolean, default: true }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
