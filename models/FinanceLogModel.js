const mongoose = require('mongoose');

const FinanceLogSchema = new mongoose.Schema({
    type: {
        type: String,
        enum: ['income', 'expense'],
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: String,
    relatedBookingId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Booking'
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('FinanceLog', FinanceLogSchema);