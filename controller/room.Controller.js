const roomModel = require("../models/RoomModel");
const expressAsyncHandler = require("express-async-handler");
const UserModel = require("../models/UserModel");

const getRooms = expressAsyncHandler(async(req,res)=>{
    const rooms = await roomModel.find();
    if(rooms){
        res.status(200).json(rooms);
    }else{
        res.status(201).json({message:"room is not available!"});
    }
})



const createRoom = expressAsyncHandler(async(req,res)=>{
    const { roomNumber,categoryId,floor} = req.query;
    let newRoom = new roomModel({
        roomNumber,
        categoryId,
        floor
    })
    const room = await newRoom.save();
    res.status(200).json(room);
});


const deAvailable = expressAsyncHandler(async(req,res)=>{
    const {id} = req.params;
    const roomAction = await UserModel.findById(id)
    const updateRoom = await UserModel.findByIdAndUpdate(id,{isActive:!roomAction.deActive})
    res.status(200).son(updateRoom);
})



module.exports = {
    getRooms,
    createRoom,
    deAvailable
}