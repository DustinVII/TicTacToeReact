// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import socket from './socket';

import NewGame from './NewGame';
import HighScores from './HighScores';
import './App.css'; // Import your CSS file here


function App() {

  let gamertag = prompt("Choose a gamertag:");

useEffect(() => {
  // === MESSAGE ===
  socket.on("message", (data) => {
    console.log("Received:", data);
  });

  // === CONNECT ===
  socket.on("connect", () => {

    socket.emit("gamertag", gamertag);

    // Ask server for player list
    socket.emit("getPlayerList");
  });

  // === PLAYER LIST ===
  socket.on("playerList", (list) => {
    const messageDiv = document.querySelector('.message');
    if (!messageDiv) return;
    // Set the innerHTML to show each name inside a <p> tag
    messageDiv.innerHTML = list.map(name => `<p> ${name} </p>`).join('');
  });

  // === USER CONNECTED ===
  socket.on("userConnected", (data) => {
    const messageDiv = document.querySelector('.message');
    if (messageDiv) {
      messageDiv.innerText += 
        (messageDiv.innerText ? '\n' : '') + `${data.gamertag} has joined the game!`;
    }
  });

  // === USER DISCONNECTED ===
  socket.on("userDisconnected", (tag) => {
    const messageDiv = document.querySelector('.message');
    if (!messageDiv) return;

    const lines = messageDiv.innerText.split('\n');

    // Remove any line mentioning the player
    const filtered = lines.filter(line => !line.includes(tag));

    messageDiv.innerText = filtered.join('\n');

  });

  return () => {
    socket.off("message");
    socket.off("connect");
    socket.off("playerList");
    socket.off("userConnected");
    socket.off("userDisconnected");
  };
}, []);



  return (
    <Router>
    {/* Logo stays here, visible on all pages */}
    <div id="logo" className="no-highlight">
    <Link to="/"><img src="images/tictactoe-logo.png" alt="Logo" /></Link>
    </div>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/start" element={<NewGame />} />
      <Route path="/highscores" element={<HighScores />} />
    </Routes>

    <div className="message"></div>

    <div id="footer" className="no-highlight">
    <p><Link to="/">Tic Tac Toe React</Link> &copy; 2025 | Developed by <Link to="https://github.com/DustinVII" target="_blank">Dustin Refos</Link></p>
    </div>
  </Router>

  


  
  );
}


function Home() {
  return (
  <div className="menu">
  <ul>
    <li><Link to="/start">New game</Link></li>
    <li><Link to="https://github.com/DustinVII/TicTacToeReact" target='blank'>GitHub</Link></li>
  </ul>
</div>
  );
}

export default App;