import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ScoreProvider } from './ScoreContext';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById('root'));

// Serve from /TicTacToe subfolder
root.render(
  <BrowserRouter basename="/TicTacToe">
    <ScoreProvider>
      <App />
    </ScoreProvider>
  </BrowserRouter>
);

reportWebVitals();