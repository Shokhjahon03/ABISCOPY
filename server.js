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
  let arr = [
    [42.546245, 1.601554],
    [23.424076, 53.847818],
    [33.93911, 67.709953],
    [17.060816, -61.796428],
  ];
  var i = 0;
  setInterval(() => {
    if (i < 3) {
      console.log(arr[i]);
      io.emit("dataUpdate", arr[i]);
      i = i + 1;
    } else {
      i = 0;
    }
    // fetch("http://gumbaz.samar.uz:8887")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     console.log(data);
    //     io.emit("dataUpdate", data);
    //   }).catch(error=>console.log(error));
  }, 5000); // Har 2 sekundda bir ma'lumotlarni yangilaymiz
});

httpServer.listen(PORT, HOST, () => {
  console.log("Server running on port:", PORT);
});