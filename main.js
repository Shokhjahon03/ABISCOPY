const WebSocket = require("ws");

// Create WebSocket connection.
const socket = new WebSocket("ws://127.0.0.1:8000");
console.log("aaaa");
// Connection opened
socket.addEventListener("open", (event) => {
  socket.send("asrar!");
});
console.log("bb");

// Listen for messages
socket.addEventListener("message", (event) => {
  console.log("<<<", event.data);
});
