// frontend/src/components/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env ? import.meta.env.VITE_REACT_APP_SOCKET_URL || "http://localhost:5001" : "http://localhost:5001";

const socket = io(SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
});
console.log("🔗 Connecting to socket URL:", SOCKET_URL);

export default socket;
