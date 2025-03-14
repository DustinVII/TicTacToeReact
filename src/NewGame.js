// SecondPage.js
import React, { useState } from 'react';
// import { ScoreContext } from './ScoreContext';

const NewGame = () => {
  // Define the winning combinations: each subarray contains indexes in the board array that form a winning line.
  const winPatterns = [
    [0, 1, 2], // Top row
    [3, 4, 5], // Middle row
    [6, 7, 8], // Bottom row
    [0, 3, 6], // Left column
    [1, 4, 7], // Middle column
    [2, 5, 8], // Right column
    [0, 4, 8], // Diagonal from top-left to bottom-right
    [2, 4, 6], // Diagonal from top-right to bottom-left
  ];

  // Function to check if there's a winner on the board.
  // It takes the current state of the board (newSpotImages) as an array.
  // It returns the winning image (or symbol) if found, otherwise null.
  const checkWinner = (newSpotImages) => {
    for (let i = 0; i < winPatterns.length; i++) {
      const [firstIndex, secondIndex, thirdIndex] = winPatterns[i];
      if (newSpotImages[firstIndex] !== null) {
        if (
          newSpotImages[firstIndex] === newSpotImages[secondIndex] &&
          newSpotImages[firstIndex] === newSpotImages[thirdIndex]
        ) {
          return newSpotImages[firstIndex];
        }
      }
    }
    return null;
  };

  // Function to check if the game is a draw.
  // It returns true if all spots are filled and there's no winner.
  const checkDraw = (spotImages) => {
    const boardIsFull = spotImages.every(spot => spot !== null);
    return boardIsFull && !checkWinner(spotImages);
  };

  // State variable "spotImages" holds the current state of the board (9 spots, all initially null).
  const [spotImages, setSpotImages] = useState(Array(9).fill(null));

  // Array holding the two images used for the two players.
  const images = [
    'images/x.png',  // Represents player X.
    'images/o.png'   // Represents player O.
  ];

  // State variable to track whose turn it is (0 or 1).
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Score states.
  const [scoreX, setScoreX] = useState(0);
  const [scoreO, setScoreO] = useState(0);
  const [scoreD, setScoreD] = useState(0);

  // Function to reset the game board.
  const resetBoard = () => {
    setSpotImages(Array(9).fill(null));
    setCurrentImageIndex(0);
  };

  // Function to reset scores.
  const resetScore = () => {
    resetBoard();
    setScoreX(0);
    setScoreO(0);
    setScoreD(0);
  };

  // Function that handles the event when a spot on the board is clicked.
  const handleSpotClick = (index) => {
    // If the spot is already taken or a winner exists, ignore the click.
    if (checkDraw(spotImages) || checkWinner(spotImages)) 
      {resetBoard();
        return;
        }
    if (spotImages[index] !== null) return;

    // Create a copy of the current board state.
    const newSpotImages = [...spotImages];
    // Place the current player's image in the selected spot.
    newSpotImages[index] = images[currentImageIndex];
    // Update the board state with the new move.
    setSpotImages(newSpotImages);

    // Check for win or draw after the move.
    const winner = checkWinner(newSpotImages);
    const draw = checkDraw(newSpotImages);

    if (winner) {
      setTimeout(() => {
        if (winner === images[0]) {
          //alert('Player X wins!');
          setScoreX(prev => prev + 1);
        } else if (winner === images[1]) {
          //alert('Player O wins!');
          setScoreO(prev => prev + 1);
        }
      }, 0);
    } else if (draw) {
      setTimeout(() => {
        //alert("That's a draw!");
        setScoreD(prev => prev + 1);
      }, 0);
    }

    // Switch the turn to the other player.
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  };

  // Compute status variables for rendering the message.
  const winner = checkWinner(spotImages);
  const draw = checkDraw(spotImages);
  const winnerLabel = winner === images[0] ? "X" : "O";
  const winnerClass = winner === images[0] ? "xcolor" : "ocolor";
  const drawClass = "dcolor";

  return (
    <>


{/* Score display and reset button */}
<div className="scores no-highlight">
        <div id="scoreBoard">
          <div className="scoreBox">
            <span className="xcolor">X:</span> {scoreX}
          </div>
          <div className="scoreBox">
            <span className="dcolor">D:</span> {scoreD}
          </div>
          <div className="scoreBox">
            <span className="ocolor">O:</span> {scoreO}
          </div>
        </div>
        {(checkWinner(spotImages) || checkDraw(spotImages)) && (
          <>
            <button onClick={resetBoard}>Rematch</button>
            <button onClick={resetScore}>Reset Score</button>
          </>
        )}
      </div>



      <div className="statusMessage">
  {(() => {
    if (winner) {
      return (
        <p key="win" className="winMessage zoomslow">
          <span className={winnerClass}>{winnerLabel}</span> WINS!
        </p>
      );
    } else if (draw) {
      return (
        <p key="draw" className="winMessage zoomslow">
          It's a <span className={drawClass}>DRAW</span>!
        </p>
      );
    } else if (currentImageIndex === 0) {
      return (
        <p key="turnX" className="zoomfast">
          <span className="xcolor">X</span> it's your turn!
        </p>
      );
    } else {
      return (
        <p key="turnO" className="zoomfast">
          <span className="ocolor">O</span> it's your turn!
        </p>
      );
    }
  })()}
</div>


      




          {/* Game board container */}
          <div id="gameboard" className="no-highlight">
        {spotImages.map((imgSrc, index) => (
          <div
            key={index}
            className={`spot spot${index + 1}`}
            onClick={() => handleSpotClick(index)}
          >
            {imgSrc && <img className="zoomfast" src={imgSrc} alt={`Spot ${index + 1}`} />}
          </div>
        ))}
      </div>


    </>
  );
};

export default NewGame;
