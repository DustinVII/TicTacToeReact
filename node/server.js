const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*" }
});

// Keep track of players globally
io.players = new Map();

io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // Add player with no gamertag yet
  io.players.set(socket.id, { id: socket.id, gamertag: null });

  // Helper: send list to all clients
  function broadcastPlayerList() {
    const list = Array.from(io.players.values())
      .filter(p => p.gamertag)
      .map(p => p.gamertag);

    io.emit("playerList", list);
  }

  // Assign gamertag
  socket.on("gamertag", (gamertag) => {
    const player = io.players.get(socket.id);
    if (player) {
      player.gamertag = gamertag;
      broadcastPlayerList();
    }
  });

  // Message test
  socket.on('message', (msg) => {
    console.log("Client says:", msg);
  });

  // Match result
  socket.on('matchComplete', (result) => {
    console.log("Match result:", result);
  });

  // Handle spot play
  socket.on("spotPlayed", (spot, player) => {
    console.log("Spot played:", spot, "Player:", player);
    socket.broadcast.emit("spotPlayedByOtherPlayer", spot, player);
  });

  // Scoreboard sync
  socket.on("updateScoreboard", (score, player) => {
    socket.broadcast.emit("updateScoreboardForOthers", score, player);
  });

  // Disconnect handler (ONLY ONE)
  socket.on('disconnect', () => {
    const player = io.players.get(socket.id);
    const gamertag = player?.gamertag;

    io.players.delete(socket.id);
    broadcastPlayerList();

    if (gamertag) {
      socket.broadcast.emit("userDisconnected", gamertag);
    }

    console.log('User disconnected:', socket.id);
  });

  // Send initial list
  broadcastPlayerList();
});

server.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
