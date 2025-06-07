const Route = require("express").Router();
const roomController = require('../controller/room.Controller')

Route.get("/getRooms",roomController.getRooms);
Route.get("/createRoom",roomController.createRoom);
Route.get("/deAvailable/:id",roomController.deAvailable)



module.export = Route;