const route = require('express').Router();

const UserController = require('../controller/user.Controller');


route.put('/register', UserController.register);
route.get('/getUser/:id',UserController.getUser);
route.get('/getAllUsers',UserController.getAllUsers);
route.get("/deActivate/:id",UserController.deActivateUSer);


module.exports = route;