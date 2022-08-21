require("dotenv").config();
const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const socketController = require("./socket/SocketController");
const io = new Server(server);
const fs = require("fs");

const PORT = process.env.PORT;
const HOST = process.env.HOST;

app.use(express.static(path.resolve(__dirname, "static")));
app.use(express.json());

app.get("/", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages", "index.html"));
});

app.get("/controller", (req, res) => {
  res.sendFile(path.resolve(__dirname, "pages", "controller.html"));
});

app.get("/message", (req, res) => {
  const data = fs.readFileSync(
    path.resolve(__dirname, "base", "message.txt"),
    "utf-8"
  );
  res.send(data);
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("message", ({ key, value }) => {
    if (key == process.env.KEY) {
      fs.writeFileSync(path.resolve(__dirname, "base", "message.txt"), value);
      io.emit("message update", value);
      io.emit("key error", false);
    } else {
      io.emit("key error", true);
    }
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Server started on http://${HOST}:${PORT}`);
});
