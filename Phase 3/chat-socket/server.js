// load the express module 
let express = require("express");

// create the reference of epxress module 
let app = express();

// load the http module and connect to express module with Server property
let http = require("http").Server(app);

// load the socket.io module and connect http module 
// with IIFE features 
let io = require('socket.io')(http);

app.get("/",(request,response)=> {
    response.sendFile(__dirname + "/index.html");
})

const responses = [
    "How are you doing today?",
    "I am well. Thanks for asking!",
    "Interesting weather we are having these days.",
    "I just want to stay in bed all day!",
    "Well I'm going to bed, you can talk to my friend now.",
    "Hey client! I am the other friend."
]

let i = 0;

io.on("connection",(socket)=> {
    console.log("Client connected");
    socket.emit("serverMsg","Hello Client!");
    
    socket.on("clientMsg",(msg)=> {
        console.log(`Client: ${msg}`);
        socket.emit("serverMsg",responses[i%6]);
        i++;
    })

})

http.listen(9090,()=>console.log('server running on port number 9090'));