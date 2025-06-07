const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
    name: { type: String, required: true }, // "maxBookingDays"
    contact: {
        email: { type: String },
        phone: { type: String }, // "998901234567"
        address: { type: String }, // "Tashkent, Uzbekistan"
    },
    image:{
        type:String
    }
});

module.exports = mongoose.model('Setting', SettingSchema);