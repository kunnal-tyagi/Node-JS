import React, { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import socketconnect from "./utils/socket";
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
    //  const socket=createSocketConnection();
    //  As soon as page is loaded,the createSocketConnection function will be called and joinChat event will be emitted
    
    // Join only after socket connects
    // socketconnect.on("connect", () => {
      socketconnect.emit("joinChat", { userID, targetUserId });
    // });
      // Remove old listener -> add new one
    socketconnect.off("MessageRecieved");

     socketconnect.on('MessageRecieved',({firstname,text})=>{
             console.log(text);
             setMessages(prev => [...prev, { firstname, text }]);

     })
     return ()=>{
        socketconnect.off();
     }
  },[userID,targetUserId])
  
  const sendMessage = () => {
    // const socket = createSocketConnection();
     if (!newMessage.trim()) return;

    socketconnect.emit("sendMessage", {
      firstname: user.firstname,
      lastname: user.lastname,
      userID,
      targetUserId,
      text: newMessage,
    });
    // Add to own UI immediately
    // setMessages((prev) => [
    //   ...prev,
    //   { firstname: user.firstname, text: newMessage },
    // ]);
    setNewMessage("");
  };

 return (
    <div className="w-1/2 mx-auto border border-gray-600 h-[60vh] bg-gray-800 flex flex-col mt-5">
      <h1 className="p-5 border-b bg-gray-600 text-white">Chat</h1>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        {messages.map((msg, index) => {
          const isMe = msg.firstname === user.firstname;
          return (
            <div
              key={index}
              className={`chat ${isMe ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    alt="profile"
                    src={
                      isMe
                        ? user.photoUrl
                        : "https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                    }
                  />
                </div>
              </div>

              <div className="chat-header text-white">
                {msg.firstname}
              </div>

              <div className="chat-bubble">{msg.text}</div>
            </div>
          );
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
        <button
          onClick={sendMessage}
          className="bg-yellow-500 px-4 py-2 rounded font-bold"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
