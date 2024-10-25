import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);
const io = new Server(server);

app.use(express.json());

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("send-message", (msg) => {
    console.log("message:", msg);

    io.emit("receive-message", msg);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(3000, () => {
  console.log("Server is running on port 3000");
});
