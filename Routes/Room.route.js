const Route = require("express").Router();
const roomController = require('../controller/room.Controller')

Route.get("/getRooms",roomController.getRooms);
Route.get("/createRoom",roomController.createRoom);
Route.get("/updateRoom",roomController.updateRoom);
Route.get("/deAvailable/:id",roomController.deAvailable);
Route.get("/bookedRoom",roomController.bookedRoom);
Route.get("/updateBookingLog",roomController.updateBookingLog);



module.exports = Route;