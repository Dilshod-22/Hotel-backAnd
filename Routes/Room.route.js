const Route = require("express").Router();
const roomController = require('../controller/room.Controller')

Route.get("/getRooms",roomController.getRooms);
Route.get("/getARoom",roomController.getARooms);
Route.post("/createRoom",roomController.createRoom);
Route.put("/updateRoom",roomController.updateRoom);
Route.put("/deAvailable/:id",roomController.deAvailable);
Route.post("/bookedRoom",roomController.bookedRoom);
Route.put("/updateBookingLog",roomController.updateBookingLog);



module.exports = Route;