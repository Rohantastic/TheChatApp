const express = require('express');
const http = require('http');

const cors = require('cors');
const app = express();
const server = http.createServer(app);
const socketio = require('socket.io');
const path = require('path');
const io = socketio(server);
const formatMessage = require('./utils/messages');
const { userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users');
const userRoute = require('./routes/user');
const User = require('./models/user');
const Message = require('./models/message');
const sequelize = require('./config/database');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use(express.static(path.join(__dirname, 'public')));
//run when client connects
io.on('connection', (socket) => {

    socket.on('joinRoom', ({ username, room }) => {
        const user = userJoin(socket.id, username, room);

        socket.join(user.room);


        //Welcome current user
        socket.emit('message', formatMessage('rohanApp', 'Welcome to the rohan app'));

        //broadcast when a user connects

        socket.broadcast.to(user.room).emit('message', formatMessage('rohanApp', `${user.username} has joined the chat`));

        //send 

        io.to(user.room).emit('roomUsers', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    });


    //Listen for chatMessage
    socket.on('chatMessage', (msg) => {
        //console.log(msg);

        const user = getCurrentUser(socket.id);
        //emit message to server
        io.to(user.room).emit('message', formatMessage(user.username, msg));
    });

    //Runs when client disconnects

    socket.on('disconnect', () => {
        const user = userLeave(socket.id);
        if (user) {
            io.to(user.room).emit('message', formatMessage('rohanApp', `A ${user.username} has left the chat`));

            io.to(user.room).emit('roomUsers', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
    });

})


app.use('/',userRoute);

User.hasMany(Message);
Message.belongsTo(User);

sequelize.sync();

server.listen(3000, (err) => {
    console.log('running')
});