const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  socket.emit("userConnected", "Socket ID connected:", socket.id);

  socket.on('message', (msg) => {
    console.log("Client says:", msg);
    // socket.emit("message", "Server received: " + msg);
  });

  socket.on('matchComplete', (data) => {
    if (data === "X") {
      console.log("Player X has won!");
    } else if (data === "O") {
      console.log("Player O has won!");
    } else if (data === "draw") {
      console.log("It's a draw!");
    } else {
      console.log("Unknown match result:", data);
    }
  });

  socket.on("spotPlayed", (spot, player) => {
    console.log("Spot:", spot, "Player:", player);
    socket.broadcast.emit("spotPlayedByOtherPlayer", spot, player);
  });

  socket.on("updateScoreboard", (score, player) => {
    socket.broadcast.emit("updateScoreboardForOthers", score, player);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
  });
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});