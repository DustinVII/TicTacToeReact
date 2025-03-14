// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import NewGame from './NewGame';
import HighScores from './HighScores';
import './App.css'; // Import your CSS file here

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

function App() {




  return (
    <Router>
    {/* Logo stays here, visible on all pages */}
    <div id="logo" class="no-highlight">
    <Link to="/"><img src="images/tictactoe-logo.png" alt="Logo" /></Link>
    </div>

    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/start" element={<NewGame />} />
      <Route path="/highscores" element={<HighScores />} />
    </Routes>

    <div id="footer" class="no-highlight">
    <p><Link to="/">Tic Tac Toe React</Link> &copy; 2025 | Developed by <Link to="https://github.com/DustinVII" target="_blank">Dustin Refos</Link></p>
    </div>
  </Router>

  


  
  );
}

export default App;