// App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import socket from './socket';

import NewGame from './NewGame';
import HighScores from './HighScores';
import './App.css'; // Import your CSS file here


function App() {

  useEffect(() => {
    socket.on("message", (data) => {
      console.log("Received:", data);
    });

    return () => {
      socket.off("message");
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