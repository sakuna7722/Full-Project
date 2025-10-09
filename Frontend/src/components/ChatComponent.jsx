import React, { useState, useEffect } from "react";
import { io } from "socket.io-client";
import axios from "axios";

const ChatComponent = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [user, setUser] = useState("ram");
  // FIX: Real userId from token/localStorage
  const [userId, setUserId] = useState(() => {
    const storedId = localStorage.getItem("userId");
    if (storedId) return storedId;
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = JSON.parse(atob(token.split('.')[1]));
        return decoded.id;
      } catch (e) {
        console.warn("[Chat] Token decode failed, using fallback u1");
      }
    }
    return "u1";  // Fallback
  });

  const room = `private_${userId}`;

  useEffect(() => {
    const newSocket = io("http://localhost:5001", {
      transports: ["websocket"],
      reconnection: true,
    });
    setSocket(newSocket);

    newSocket.emit("joinRoom", { room, userName: user });
    console.log(`[User] Joined room: ${room}`);

    // FIX: receiveMessage with debug logs
    newSocket.on("receiveMessage", (message) => {
      console.log("[🔍 User Frontend] receiveMessage event triggered:", { ...message, message: message.message?.substring(0, 20) + '...' });
      console.log("[🔍 User Frontend] Current room:", room, "Incoming room:", message.room);
      if (message.room === room || !message.room) {
        console.log("[✅ User Frontend] Reply added to UI for room:", room);
        setMessages((prev) => [...prev, message]);
      } else {
        console.warn("[⚠️ User Frontend] Reply ignored - room mismatch:", { current: room, incoming: message.room });
      }
    });

    // FIX: Socket events debug
    newSocket.on("connect", () => console.log("[✅ User Socket] Connected, ID:", newSocket.id));
    newSocket.on("disconnect", (reason) => console.warn("[⚠️ User Socket] Disconnected:", reason));
    newSocket.on("error", (err) => console.error("[❌ User Socket] Error:", err));

    axios
      .get(`http://localhost:5001/chat/messages?room=${room}&limit=50`)
      .then((res) => setMessages(res.data.messages || []))
      .catch((err) => console.error("Error fetching messages:", err.response?.data || err.message));

    return () => newSocket.close();
  }, [userId]);  // ← Add userId dep if dynamic

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    const messageData = {
      room,
      userName: user,   
      message: text,     
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, { ...messageData, userName: user, message: text }]);

    socket.emit("sendMessage", messageData);

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