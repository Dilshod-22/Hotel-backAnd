const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const RoomActivityLogSchema = new Schema({
    roomId: { type: Types.ObjectId, required: true, ref: 'Room' },
    action: { 
        type: String, 
        enum: ['created', 'updated', 'deactivated', 'booked'], 
        required: true 
    },
    description: { type: String },
    date: { type: Date, default: Date.now },
    byUserId: { type: Types.ObjectId, required: true, ref: 'User' }
});

module.exports = mongoose.model('RoomActivityLog', RoomActivityLogSchema);