import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "./utils/socket";
import { useSelector } from "react-redux";
const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user=useSelector((state)=>state.user)
//   console.log(user.firstname);
  
  const userID=user?._id;
  useEffect(()=>{
    if(!userID || !targetUserId)return;
     const socket=createSocketConnection();
    //  As soon as page is loaded,the createSocketConnection function will be called and joinChat event will be emitted
     socket.emit('joinChat',{userID,targetUserId});
     socket.on('MessageRecieved',({firstname,text})=>{
             console.log(text);
             setMessages([...messages,{firstname,text}]);
     })
     return ()=>{
        socket.disconnect();
     }
  },[userID,targetUserId])
  
  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstname: user.firstname,
      lastname: user.lastname,
      userID,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div 
      className="w-1/2 mx-auto border border-gray-600 h-[60vh] bg-gray-800 flex flex-col mt-5 "
    //   style={{ height: "calc(100vh - 120px)" }}  // Adjust based on your navbar height
    >
      {/* Header */}
      <h1 className="p-5 border-b bg-gray-600 text-white">Chat</h1>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        {/* messages */}
        {messages.map((msg,index)=>{
            return <React.Fragment key={index}>
            <div  className="chat chat-start">
  <div className="chat-image avatar">
    <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
      />
    </div>
  </div>
  <div className="chat-header text-white">
    Obi-Wan Kenobi
    <time className="text-xs opacity-50">12:45</time>
  </div>
  <div className="chat-bubble">You were the Chosen One!</div>
  <div className="chat-footer opacity-50 text-white">Delivered</div>
</div>
<div className="chat chat-end">
  <div className="chat-image avatar">
    {!user ? <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
      />
    </div>:  <div className="w-10 rounded-full">
      <img
        alt="Tailwind CSS chat bubble component"
        src={user.photoUrl}
      />
    </div>}
  
  </div>
 {user && (
  <div className="chat-header text-white">
    {user.firstname} {user.lastname}
    <time className="text-xs opacity-50">12:46</time>
  </div>
)}

  <div className="chat-bubble">I hate you!</div>
  <div className="chat-footer opacity-50 text-white">Seen at 12:46</div>
</div> </React.Fragment>
        })}
      </div>

      {/* Input */}
      <div className="p-5 border-t border-gray-600 flex items-center gap-2 bg-gray-900">
        <input
          className="flex-1 border border-gray-500 rounded px-3 py-2 text-white"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Type a message..."
        />
        <button onClick={sendMessage} className="bg-yellow-500 px-4 py-2 rounded font-bold">Send</button>
      </div>
    </div>
  );
};

export default Chat;
