const route = require('express').Router();

const UserController = require('../controller/user.Controller');


route.post('/register', UserController.register);
route.put('/getUser/:id',UserController.getUser);
route.get('/getAllUsers',UserController.getAllUsers);
route.put("/deActivate/:id",UserController.deActivateUSer);
route.post("/login",UserController.login)
route.put("/updateUser/:id",UserController.updateUser)


module.exports = route;