const roomModel = require("../models/RoomModel");
const expressAsyncHandler = require("express-async-handler");
const UserModel = require("../models/UserModel");
const BookingModel = require("../models/BookingModel");


const getRooms = expressAsyncHandler(async(req,res)=>{
    // const rooms = await roomModel.find();
    // if(rooms){
    //     res.status(200).json(rooms);
    // }else{
    //     res.status(201).json({message:"room is not available!"});
    // }
    const rooms = await roomModel.find().populate("categoryId");

res.status(200).json({
  message: "Rooms fetched successfully",
  rooms
});


})



const getRooms2 = expressAsyncHandler(async(req,res)=>{
  const rooms = await roomModel.find()
    .populate("categoryId") // kategoriyani to'liq obyekt sifatida qo'shadi
    .populate({
      path: "userId",
      select: "fullName email" // faqat fullname va email ni tanlab olish
    });

  res.status(200).json({
    message: "Rooms fetched successfully",
    rooms
  });

})

const getARooms = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const rooms = await roomModel.find({ _id: id }).populate("categoryId");

    if (!rooms || rooms.length === 0) {
      return res.status(404).json({ message: "No rooms found for this category!" });
    }
    let kt = rooms[0];
    res.status(200).json({
    //   message: "Rooms fetched successfully",
      kt
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});


const createRoom = expressAsyncHandler(async(req,res)=>{
    const { roomNumber,categoryId,floor,guests,size} = req.body;
    let newRoom = new roomModel({
        roomNumber,
        categoryId,
        floor,
        guests,
        size
    })
    const room = await newRoom.save();
    res.status(200).json(room);
});


const deAvailable = expressAsyncHandler(async(req,res)=>{
    const {id} = req.params;
    const roomAction = await UserModel.findById(id)
    const updateRoom = await UserModel.findByIdAndUpdate(id,{isActive:!roomAction.deActive})
    res.status(200).json(updateRoom);
})

const updateRoom = expressAsyncHandler(async(req,res)=>{
    const { roomNumber, categoryId, floor, guests, size } = req.body;
    const { id } = req.params;

    if (!id) {
    return res.status(400).json({ error: "Room ID is required" });
    }

    // Avval xonani bazadan topamiz
    const room = await roomModel.findById(id);
    if (!room) {
    return res.status(404).json({ error: "Room not found" });
    }

    // Yangilanish ma’lumotlarini tayyorlaymiz
    const updateData = {};
    if (roomNumber) updateData.roomNumber = roomNumber;
    if (categoryId) updateData.categoryId = categoryId;
    if (floor) updateData.floor = floor;
    if (guests) updateData.guests = guests;
    if (size) updateData.size = size;

    // Xonani yangilaymiz
    const updatedRoom = await roomModel.findByIdAndUpdate(id, updateData, { new: true });

    res.status(200).json({
    message: "Room updated successfully",
    room: updatedRoom
    });

})

const bookedRoom = expressAsyncHandler(async(req,res)=>{
    console.log("ekldi");
    
 const { roomId, description, userId, action,totalPrice, checkInDate, checkOutDate } = req.body;

    if (!roomId || !userId || !action) {
        return res.status(400).json({ message: 'roomId, byUserId va action majburiy maydonlar.' });
    }

    const allowedActions = ['created', 'updated', 'deactivated', 'booked'];
    if (!allowedActions.includes(action)) {
        return res.status(400).json({ message: `action noto‘g‘ri. Ruxsat etilgan: ${allowedActions.join(', ')}` });
    }

    const parsedCheckIn = checkInDate ? new Date(checkInDate) : undefined;
    const parsedCheckOut = checkOutDate ? new Date(checkOutDate) : undefined;

    // BookingModel hujjati yaratish
    if (action==="booked"){
    const log = new BookingModel({
        roomId,
        description,
        status:'pending',
        totalPrice,
        userId,
        checkInDate: parsedCheckIn,
        checkOutDate: parsedCheckOut
    });
  }else{
    const log = new BookingModel({
        roomId,
        description,
        action,
        totalPrice,
        userId,
        checkInDate: parsedCheckIn,
        checkOutDate: parsedCheckOut
    });
  }

    const savedLog = await log.save();

    // Agar action booked bo'lsa va checkOutDate bo'lsa, Room modelini yangilash
    if (action === 'booked' && parsedCheckOut) {
        await roomModel.findByIdAndUpdate(roomId, {
            lastBookedUntil: parsedCheckOut,
            userId:userId
        });
    }

    res.status(201).json({ message: 'Log muvaffaqiyatli yaratildi', log: savedLog });
})

const updateBookingLog = expressAsyncHandler(async (req, res) => {
    const { id } = req.params;  // URL param orqali log ID olinadi
    const { roomId, description, byUserId, action, checkInDate, checkOutDate } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Log ID kiritilishi shart.' });
    }

    // Majburiy maydonlarni tekshirish (kerak bo‘lsa)
    if (!roomId || !byUserId || !action) {
        return res.status(400).json({ message: 'roomId, byUserId va action majburiy maydonlar.' });
    }

    const allowedActions = ['created', 'updated', 'deactivated', 'booked'];
    if (!allowedActions.includes(action)) {
        return res.status(400).json({ message: `action noto‘g‘ri. Ruxsat etilgan: ${allowedActions.join(', ')}` });
    }

    const parsedCheckIn = checkInDate ? new Date(checkInDate) : undefined;
    const parsedCheckOut = checkOutDate ? new Date(checkOutDate) : undefined;

    // Update ma'lumotlari
    const updateData = {
        roomId,
        description,
        action,
        byUserId,
        checkInDate: parsedCheckIn,
        checkOutDate: parsedCheckOut
    };

    // Logni yangilash
    const updatedLog = await BookingModel.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedLog) {
        return res.status(404).json({ message: 'Log topilmadi.' });
    }

    // Agar action booked bo‘lsa va checkOutDate bo‘lsa, Room ni yangilash
    if (action === 'booked' && parsedCheckOut) {
        await Room.findByIdAndUpdate(roomId, {
            lastBookedUntil: parsedCheckOut
        });
    }

    res.status(200).json({ message: 'Log muvaffaqiyatli yangilandi', log: updatedLog });
});

module.exports = {
    getRooms,
    getRooms2,
    createRoom,
    deAvailable,
    updateRoom,
    bookedRoom,
    getARooms,
    updateBookingLog
}