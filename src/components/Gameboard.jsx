import React, { useState } from 'react';

export default function Gameboard() {

  const [spots, setSpots] = useState([
    { spotnumber: 1, type: null },
    { spotnumber: 2, type: null },
    { spotnumber: 3, type: null },
    { spotnumber: 4, type: null },
    { spotnumber: 5, type: null },
    { spotnumber: 6, type: null },
    { spotnumber: 7, type: null },
    { spotnumber: 8, type: null },
    { spotnumber: 9, type: null },
  ]);

  const winningCombinations = [
    [0, 1, 2], // top row
    [3, 4, 5], // middle row
    [6, 7, 8], // bottom row
    [0, 3, 6], // left column
    [1, 4, 7], // middle column
    [2, 5, 8], // right column
    [0, 4, 8], // top-left to bottom-right diagonal
    [2, 4, 6]  // top-right to bottom-left diagonal
  ];
  
  function checkWinner(spots) {
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      if (spots[a].type && spots[a].type === spots[b].type && spots[a].type === spots[c].type) {
        return spots[a].type; // Return the type of the winner (e.g., 'X' or 'O')
      }
    }
    return null; // No winner
  };


  const [playerTurn, setPlayerTurn] = useState("x");
  const playerColor = (playerTurn === "x" ? "xcolor" : "ocolor");
  const statusMessage = (
    <p>
      Player <span className={`${playerColor}`}>{playerTurn.toUpperCase()}</span> it's your turn!
    </p>
  );

  function addSpot(index) {
    setSpots((currentSpots) => {
      return currentSpots.map((spot, i) => 

          {if (i === index && spot.type === null) {

            return { ...spot, type: playerTurn };

            

          } else {
            return spot;
          }}

      );
    });

    setPlayerTurn((prevTurn) => (prevTurn === "x" ? "o" : "x"));

    const winner = checkWinner(spots);
  if (winner) {
    alert(`${winner} wins!`);
    // Reset the game or handle the win accordingly
  }
    
  }
    return (
    
        <div id="gameboard">

          <p>{statusMessage}</p>
            
            {spots.map((spot, index) => (
          <div 
            key={index} 
            className={`spot ${spot.spotnumber}`} 
            onClick={() => (spot.type === null ? addSpot(index) : undefined)}
          >
            {spot.type && <img src={`/src/assets/${spot.type}.png`} alt={spot.type} />}
          </div>
        ))}

        


      </div>

    )
  }