import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import socketconnect from "./utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((state) => state.user);
  const userID = user?._id;

  const messagesEndRef = useRef(null);

  // ✅ Fetch old messages
  const FetchMessages = async () => {
    try {
      const prevChats = await axios.get(
        `http://localhost:3000/chat/${targetUserId}`,
        { withCredentials: true }
      );

      const chatMessages = prevChats?.data?.messages.map((msg) => ({
        firstname: msg?.senderID?.firstname,
        lastname: msg?.senderID?.lastname,
        text: msg?.text,
      }));

      setMessages(chatMessages);
    } catch (err) {
      console.log("Error fetching messages", err);
    }
  };

  useEffect(() => {
    FetchMessages();
  }, []);

  // ✅ Socket connection
  useEffect(() => {
    if (!userID || !targetUserId) return;

    socketconnect.emit("joinChat", { userID, targetUserId });

    socketconnect.off("MessageRecieved");

    socketconnect.on("MessageRecieved", ({ firstname, lastname, text }) => {
      setMessages((prev) => [...prev, { firstname, lastname, text }]);
    });

    return () => {
      socketconnect.off("MessageRecieved");
    };
  }, [userID, targetUserId]);

  // ✅ Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✅ Send message
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    socketconnect.emit("sendMessage", {
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
      className="w-full sm:w-4/5 md:w-2/3 lg:w-1/2 mx-auto
                 border border-gray-600
                 h-screen sm:h-[70vh]
                 bg-gray-800 flex flex-col
                 mt-0 sm:mt-5"
    >
      {/* Header */}
      <h1 className="p-4 sm:p-5 border-b bg-gray-600 text-white text-center sm:text-left">
        Chat
      </h1>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-3 sm:p-5 space-y-3">
        {messages.map((msg, index) => {
          const isMe = msg.firstname === user.firstname;

          return (
            <div
              key={index}
              className={`chat ${isMe ? "chat-end" : "chat-start"}`}
            >
              <div className="chat-image avatar">
                <div className="w-8 sm:w-10 rounded-full">
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

              <div className="chat-header text-white text-sm">
                {msg.firstname}
              </div>

              <div className="chat-bubble break-words max-w-[75%] sm:max-w-[60%]">
                {msg.text}
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 sm:p-5 border-t border-gray-600 flex items-center gap-2 bg-gray-900">
        <input
          className="flex-1 border border-gray-500 rounded px-3 py-2 text-white text-sm sm:text-base bg-transparent focus:outline-none"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          type="text"
          placeholder="Type a message..."
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-yellow-500 px-3 sm:px-4 py-2 rounded font-bold text-sm sm:text-base"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
