const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const UserSchema = new Schema({
    role: {
        type: String,
        enum: ['client', 'admin'],
        default: 'client',
        required: true
    },
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    address:{type:String},
    password: {
        type: String,
        required: true
    },
    phone: String,
    bookings: [{
        type: Types.ObjectId,
        ref: 'Booking'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    userActive:{
        type: Boolean,
        default: true,
    }
});

module.exports = mongoose.model('User', UserSchema);