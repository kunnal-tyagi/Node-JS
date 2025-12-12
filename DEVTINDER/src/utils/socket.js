// const socket = require("socket.io");

// const InitializeSocket=(server)=>{
// const io=socket(server,{
//   cors:{
//     origin:"http://localhost:5173",
//     credentials:true
//   }
//      })

//     io.on('connection',(socket)=>{
//        //handle events here
//        socket.on('joinChat',({userID,targetUserId})=>{
//         const roomId=[userID,targetUserId].sort().join("_");
//         console.log("Joining Room :"+roomId);
        
//         socket.join(roomId);
//        })

//        socket.on('sendMessage',({firstname,lastname,userID,targetUserId,text})=>{
//         const roomId=[userID,targetUserId].sort().join("_");
//         console.log(firstname+".."+text);
        
//         io.to(roomId).emit("MessageRecieved",{
//             firstname,text
//         })
//        })

//           })
// }

// module.exports=InitializeSocket;

const { Server } = require("socket.io");
const crypto= require("crypto");
const Chat = require("../models/chat.js");
const getSecretId=(userID,targetUserId)=>{
  return crypto
  .createHash('sha256')
  .update([userID, targetUserId].sort().join("_"))
  .digest('hex');
}
const InitializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
      methods: ["GET", "POST"],
      allowedHeaders: ["Content-Type"],
    },
  });

  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    socket.on("joinChat", ({ userID, targetUserId }) => {
      if (!userID || !targetUserId) return;

      const roomId = getSecretId(userID, targetUserId);
      console.log("Joining room:", roomId);
      socket.join(roomId);
    });

    socket.on("sendMessage",async ({ firstname,lastname, userID, targetUserId, text }) => {
     
      try{
         if (!userID || !targetUserId || !text) return;

      const roomId = getSecretId(userID, targetUserId);
      // TODO:check if userid and targetuserid ae friends before allowing to send message
          let chat=await Chat.findOne({participants:{$all:[userID,targetUserId]}}); 
          if(!chat){
            chat=new Chat({
              participants:[userID,targetUserId],
              messages:[]
            })
          }
          chat.messages.push({
            senderID:userID,
            text:text
          });
          await chat.save();
          io.to(roomId).emit("MessageRecieved", {
        firstname,
        lastname,
        text,
      });
      } catch(err){
        console.error("Error handling sendMessage:", err);
      }
      
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = InitializeSocket;
