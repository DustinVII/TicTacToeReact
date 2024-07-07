import React, { useState } from 'react';

export default function Gameboard() {

  const [spots, setSpots] = useState([
    { spotnumber: 1, type: null },
    { spotnumber: 2, type: null },
    { spotnumber: 3, type: null },
    { spotnumber: 4, type: null },
    { spotnumber: 5, type: "o" },
    { spotnumber: 6, type: null },
    { spotnumber: 7, type: null },
    { spotnumber: 8, type: null },
    { spotnumber: 9, type: null },
  ]);

  const [playerTurn, setPlayerTurn] = useState("x");

  function addSpot(index) {
    setSpots((currentSpots) => {
      let spotFilled = false;

      const updatedSpots = currentSpots.map((spot, i) => {
        if (i === index && spot.type === null) {
          spotFilled = true;
          return { ...spot, type: playerTurn };
        } else {
          return spot;
        }
      });

      // Switch player turn only if a spot was successfully filled
      if (spotFilled) {
        setPlayerTurn((prevTurn) => (prevTurn === "x" ? "o" : "x"));
      }

      return updatedSpots;
    });
  }

    return (
        <div id="gameboard">
            
            {spots.map((spot, index) => (
          <div 
            key={index} 
            className={`spot ${spot.spotnumber}`} 
            onClick={() => addSpot(index)}
          >
            {spot.type && <img src={`/src/assets/${spot.type}.png`} alt={spot.type} />}
          </div>
        ))}


      </div>
    )
  }