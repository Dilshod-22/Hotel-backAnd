const mongoose = require('mongoose');
const { Schema, Types } = mongoose;

const RoomSchema = new Schema(
{
  _id: { type: Types.ObjectId, auto: true },
  roomNumber: { type: String, required: true },
  categoryId: { type: Types.ObjectId, required: true, ref: 'Category' },
  isActive: { type: Boolean, default: true },
  status: { type: String, enum: ['available', 'notAvailable'], default: 'available' },  // Hozirgi holati
  userId: { type: Types.ObjectId, ref: 'User' },            // Bog‘langan bookinglar
  lastBookedUntil: { type: Date },           // ✅ So‘nggi bandlik muddati tugash sanasi
  createdAt: { type: Date, default: Date.now },
  floor:{type:String},
  guests:{type:String},
  size:{type:String}
}
);

module.exports = mongoose.model('Room', RoomSchema);