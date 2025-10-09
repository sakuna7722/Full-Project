// frontend/src/components/ChatComponent.jsx
import React, { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import axios from "../api/axios";

const ChatComponent = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState("ram"); // user name
  const messagesEndRef = useRef(null);

  // Get userId from localStorage / token
  const [userId] = useState(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) return storedId;
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        return decoded.id;
      } catch (e) {
        console.warn("[Chat] Token decode failed, fallback u1");
      }
    }
    return "u1";
  });

  const room = `private_${userId}`;

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const newSocket = io("http://localhost:5001", {
      transports: ["websocket"],
      reconnection: true,
    });

    setSocket(newSocket);

    newSocket.on("connect", () => {
      console.log("[✅ Socket Connected]", newSocket.id);
      newSocket.emit("joinRoom", { room, userName: user });
      console.log(`[User] Joined room: ${room}`);
    });

    newSocket.on("receiveMessage", (msg) => {
      console.log("[🟢 receiveMessage]", msg);
      // Add only messages for this room
      if (msg.room === room) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    newSocket.on("disconnect", () =>
      console.warn("[⚠️ Socket Disconnected]")
    );

    // Fetch previous messages
   axios
  .get(`http://localhost:5001/api/chat/messages?room=${room}&limit=50`)
  .then((res) => {
    if (res.data.messages) {
      const mapped = res.data.messages.map(msg => ({
        userName: msg.user,    
        message: msg.text,     
        timestamp: msg.createdAt,
        room: msg.room
      }));
      setMessages(mapped);
    }
  })
  .catch((err) =>
    console.error("Error fetching messages:", err.response?.data || err.message)
  );


    return () => newSocket.disconnect();
  }, [room, user]);

  const sendMessage = (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const messageData = {
      room,
      userName: user,
      message: text,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, messageData]);

    socket?.emit("sendMessage", messageData);
    setText("");
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-white shadow-xl rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4 text-center">
        💬 Chat with Admin
      </h2>

      <div className="border h-80 overflow-y-auto rounded-lg p-3 mb-4 bg-gray-50">
        {messages.length === 0 ? (
          <p className="text-center text-gray-500 mt-10">No messages yet</p>
        ) : (
          messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-2 ${
                msg.userName === user ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block px-3 py-2 rounded-xl ${
                  msg.userName === user
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <strong>{msg.userName}:</strong> {msg.message}
              </span>
              <small className="block text-xs text-gray-500 mt-1">
                {new Date(msg.timestamp).toLocaleTimeString()}
              </small>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={sendMessage} className="flex gap-2">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 border rounded-lg px-3 py-2 outline-none focus:ring focus:ring-blue-300"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatComponent;
