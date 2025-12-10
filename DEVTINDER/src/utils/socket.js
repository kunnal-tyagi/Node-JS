const socket = require("socket.io");

const InitializeSocket=(server)=>{
const io=socket(server,{
  cors:{
    origin:"http://localhost:5173",
  }
     })

    io.on('connection',(socket)=>{
       //handle events here
       socket.on('joinChat',({userID,targetUserId})=>{
        const roomId=[userID,targetUserId].sort().join("_");
        console.log("Joining Room :"+roomId);
        
        socket.join(roomId);
       })

       socket.on('sendMessage',({firstname,lastname,userID,targetUserId,text})=>{
        const roomId=[userID,targetUserId].sort().join("_");
        console.log(firstname+".."+text);
        
        io.to(roomId).emit("MessageRecieved",{
            firstname,text
        })
       })
          })
}

module.exports=InitializeSocket;