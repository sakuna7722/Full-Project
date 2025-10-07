// Frontend/src/components/ChatComponent.jsx
import React, { useState, useEffect, useRef, useContext } from "react";
import { AuthContext } from '../context/AuthContext'; // ← Import add karo (user name ke liye)
import socket from "./socket";
import {
  Card,
  CardContent,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { RefreshCw, Download } from "lucide-react";

const ChatComponent = () => {
  const { user } = useContext(AuthContext); // ← AuthContext se user get karo
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState(""); // Auto set from user
  const room = "general";
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // ← Auto user name set karo (manual prompt nahi)
    if (user && !userName) {
      const name = user.firstName || user.email || 'User'; // FirstName prefer, fallback email
      setUserName(name);
    }
  }, [user, userName]);

  useEffect(() => {
    if (userName) {
      socket.emit("joinRoom", { room, userName });

      // ← Yeh naya add karo (online list ke liye)
      socket.emit('addUser', { userName, id: socket.id });

      socket.on("receiveMessage", (data) => {
        // ← Fix: Sirf dusron ke messages add karo, apne mat (duplicate avoid)
        if (data.userName !== userName) {
          setMessages((prev) => [...prev, data]);
        }
      });

      // ← Naya: Admin broadcast listen karo (general room ke liye)
      socket.on("adminMessage", (data) => {
        setMessages((prev) => [...prev, data]);
      });
    }

    return () => {
      socket.off("receiveMessage");
      socket.off("adminMessage"); // ← Cleanup add karo
    };
  }, [userName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (message.trim() && userName) {
      const newMsg = { room, message, userName, timestamp: Date.now() };
      // ← Fix: Local state mein add karo (server broadcast se pehle)
      setMessages((prev) => [...prev, newMsg]);
      socket.emit("sendMessage", newMsg);
      setMessage("");
    } else {
      alert("Login karo chat karne ke liye!");
    }
  };

  if (!user) { // ← Login check add karo
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 text-gray-800 text-lg font-semibold">
        Please login to chat!
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <Card className="w-full max-w-2xl shadow-2xl border border-gray-700 rounded-2xl bg-gray-900/70 backdrop-blur-md">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex justify-between items-center p-4 border-b border-gray-700">
            <div>
              <h3 className="text-xl font-semibold">
                💬 Chat Room: <span className="text-yellow-400">{room}</span>
              </h3>
              <p className="text-sm text-gray-400">
                You’re chatting as <span className="font-medium text-yellow-300">{userName}</span>
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="text-sm text-gray-200 border-gray-700 hover:bg-gray-800">
                <RefreshCw className="w-4 h-4 mr-1" /> Refresh
              </Button>
              <Button variant="secondary" size="sm" className="text-sm text-gray-900 bg-yellow-400 hover:bg-yellow-300">
                <Download className="w-4 h-4 mr-1" /> Export
              </Button>
            </div>
          </div>

          {/* Messages */}
          <div className="h-[60vh] overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col ${msg.userName === userName ? "items-end" : "items-start"
                  }`}
              >
                <div
                  className={`px-4 py-2 rounded-2xl text-sm max-w-[80%] ${msg.userName === userName
                      ? "bg-yellow-400 text-gray-900"
                      : "bg-gray-800 text-gray-200"
                    }`}
                >
                  <span className="font-semibold">{msg.userName}</span>:{" "}
                  {msg.message}
                </div>
                <small className="text-xs text-gray-500 mt-1">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </small>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="flex items-center gap-3 border-t border-gray-700 p-4 bg-gray-900/50">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type your message..."
              className="flex-1 bg-gray-800 text-gray-200 placeholder-gray-500 px-4 py-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
            <Button
              onClick={sendMessage}
              className="bg-yellow-400 text-gray-900 font-semibold hover:bg-yellow-300 px-5 py-2 rounded-xl"
            >
              Send
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabs for Users / Stats */}
      <Tabs defaultValue="chat" className="w-full max-w-2xl mt-6">
        <TabsList className="grid grid-cols-2 bg-gray-800 border border-gray-700 rounded-xl">
          <TabsTrigger value="chat">Chat</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>
        <TabsContent value="stats">
          <Card className="mt-4 border-gray-700 bg-gray-900/60">
            <CardContent className="p-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Last Message</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.slice(-5).map((msg, i) => (
                    <TableRow key={i}>
                      <TableCell>{msg.userName}</TableCell>
                      <TableCell>{msg.message}</TableCell>
                      <TableCell>
                        {new Date(msg.timestamp).toLocaleTimeString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ChatComponent;