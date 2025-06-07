const route = require('express').Router();

const UserController = require('../controller/user.Controller');


route.post('/register', UserController.register);

// route.get('/register', UserController.register1);
route.get('/getUser/:id',UserController.getUser);
route.get('/getAllUsers',UserController.getAllUsers);
route.get("/deActivate/:id",UserController.deActivateUSer);


module.exports = route;