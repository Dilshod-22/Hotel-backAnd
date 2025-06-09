const Route = require("express").Router();
const roomController = require('../controller/room.Controller')

Route.get("/getRooms",roomController.getRooms);
Route.get("/getRoomsSecond",roomController.getRooms2);
Route.get("/getARoom/:id",roomController.getARooms);
Route.post("/createRoom",roomController.createRoom);
Route.put("/updateRoom/:id",roomController.updateRoom);
Route.put("/deAvailable/:id",roomController.deAvailable);
Route.post("/bookedRoom",roomController.bookedRoom);
Route.put("/updateBookingLog",roomController.updateBookingLog);
Route.get("/bookedRoomGet/:id",roomController.getBooked);




module.exports = Route;