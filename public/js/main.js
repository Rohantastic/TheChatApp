const chatForm = document.getElementById('chat-form');
const chatmessages = document.querySelector('.chat-messages');
const socket = io();
const roomName = document.getElementById('room-name');
const userList = document.getElementById('users');

//Get username and room from url
const{username,room} = Qs.parse(location.search,{
    ignoreQueryPrefix: true
});


//join chatroom
socket.emit('joinRoom',{username,room});

//get room and users

socket.on('roomUsers',({room,users})=>{
    outputRoomName(room);
    outputUsers(users);
});

console.log(username,room);

//Message from server
socket.on('message',(message)=>{
    console.log(message);
    outputMessage(message);

    //scroll down
    chatmessages.scrollTop = chatmessages.scrollHeight;
});

// Message submit

chatForm.addEventListener('submit',(event)=>{
    event.preventDefault();
    //get message text
    const msg = event.target.elements.msg.value;
    
    //console.log(msg);

    //emitting a message to a server
    socket.emit('chatMessage', msg);
    //clear inputs
    e.target.elements.msg = '';
    e.target.elements.msg.focus();
});


function outputMessage(message){
    const div = document.createElement('div');
    div.classList.add('message');
    div.innerHTML= `<p class="meta">${message.username}<span>${message.time}</span></p>
    <p class="text">
    ${message.text}
    </p>`;
    document.querySelector('.chat-messages').appendChild(div);
}

function outputRoomName(room){ //in chat.html, name of room
    roomName.innerText= room;

}

function outputUsers(users){ //in chat.html, name of user
    userList.innerHTML = `
    
    ${users.map(user=>`<li> ${user.username}</li>`).join('')}
    `;
}