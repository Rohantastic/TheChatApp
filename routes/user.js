const express = require('express');
const route = express.Router();
const userController = require('../controllers/user');
const authentication = require('../middleware/auth');

route.get('/login',userController.loginPage);

route.post('/login',userController.login);

route.get('/signupPage',userController.signupPage);

route.post('/signup',userController.signup);

route.get('/index',userController.getRoomPage);


module.exports = route;