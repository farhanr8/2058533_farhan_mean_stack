// load the express module 
let express = require("express");

// create the reference of epxress module 
let app = express();

// load the http module and connect to express module with Server property
let http = require("http").Server(app);

// load the socket.io module and connect http module 
// with IIFE features 
let io = require('socket.io')(http);

// load mongo
let mongoose = require('mongoose');
mongoose.pluralize(null);         

// connect to mongo
let url = 'mongodb://localhost:27017/tcsmean';
mongoose.connect(url).then(res=>console.log("connected")).catch(err=>console.log(err));
let db = mongoose.connection;
db.on("error",(err)=>console.log(err));

app.get("/",(req,res)=> {
  res.sendFile(__dirname + "/index.html");
})

db.once('open', () => {
  let ChatSchema = mongoose.Schema({
    name: String,
    message: String,
    timestamp: String
  })

  let ChatModel = mongoose.model("Chat", ChatSchema);

  io.on("connection",(socket)=> {
    console.log("Client connected");
    
    socket.on("chat",(data)=> {
      let chat = new ChatModel({
        name: data.name,
        message: data.msg,
        timestamp: new Date().toString()
      });
      console.log(chat); 

      chat.save( (err,res) => {
        if(!err){
          console.log("Message stored successfully!")
        }else{
          console.log(err)
        }
      });
    });
    
  });
});


http.listen(9090,()=>console.log('server running on port number 9090'));