// src/components/socket.js
import io from 'socket.io-client';
const socket = io('http://localhost:5001'); // Backend port adjust karo
export default socket;