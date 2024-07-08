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

  const [playerTurn, setPlayerTurn] = useState("x");
  const playerColor = (playerTurn === "x" ? "xcolor" : "ocolor");

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
    
  }

    return (
    
        <div id="gameboard">

          <p>Player <span className={`upper ${playerColor}`}>{playerTurn}</span> it's your turn!</p>
            
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