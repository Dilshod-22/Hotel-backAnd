const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'User' },
    roomId: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Room' },
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },
    totalPrice: { type: Number, required: true },
    status: { type: String, enum: ['active', 'completed', 'cancelled','pending'], default: 'active' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Booking', BookingSchema);