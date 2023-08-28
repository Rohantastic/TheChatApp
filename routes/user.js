const express = require('express');
const route = express.Router();
const userController = require('../controllers/user');
const authentication = require('../middleware/auth');
const Message = require('../models/message');

route.get('/login',userController.loginPage);

route.post('/login',userController.login);

route.get('/signupPage',userController.signupPage);

route.post('/signup',userController.signup);

route.get('/index',userController.getRoomPage);

route.post('/storeMessage', async (req, res) => {
    try {
        const { userId, message } = req.body;
        const storedMessage = await Message.create({ UserId: userId, message: message });
        res.json({ message: 'Message stored successfully', storedMessage });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while storing the message' });
    }
});

route.get('/getMessages', async (req, res) => {
    try {
        const messages = await Message.findAll({
            
        });

        res.json({ messages });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching messages' });
    }
});

module.exports = route;