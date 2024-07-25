const { error } = require("console");
const http = require("http");
const { Server } = require("socket.io");
const httpServer = http.createServer();
const PORT = 4000,
  HOST = "localhost";

const io = new Server(httpServer, {
  cors: {
    origin: "*",
    credentials: true,
  },
});

io.on("connection", (socket) => {
  console.log("Client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });

  // Ma'lumotlarni o'zgartirish
  setInterval(() => {
    fetch("http://gumbaz.samar.uz:8887")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        io.emit("dataUpdate", data);
      }).catch(error=>console.log(error));
  }, 5000); // Har 5 sekundda bir ma'lumotlarni yangilaymiz
});

httpServer.listen(PORT, HOST, () => {
  console.log("Server running on port:", PORT);
});
