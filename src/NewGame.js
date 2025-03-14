// SecondPage.js
import React, { useContext, useState   } from 'react';
import { ScoreContext } from './ScoreContext';



const SecondPage = () => {

  // indexes of spots that form winning combinations
const winPatterns  = [
  [0, 1, 2], // rows
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8], // diagonals
  [2, 4, 6],
];


const checkWinner = (newSpotImages) => {
  for (const [a, b, c] of winPatterns) {
    if (
      newSpotImages[a] !== null &&
      newSpotImages[a] === newSpotImages[b] &&
      newSpotImages[a] === newSpotImages[c]
    ) {
      return newSpotImages[a]; // Returns winning image URL or symbol
    }
  }
  return null;
};



        // Define the images you want to alternate
  const images = [
        'images/x.png',  // for example, player X
        'images/o.png'   // for example, player O
      ];
      


          // Create an array of 9 elements (for 9 spots), initially all null
        const [spotImages, setSpotImages] = useState(Array(9).fill(null));
        // Track the current image index (0 or 1 for alternating between X and O)
        const [currentImageIndex, setCurrentImageIndex] = useState(0);


        const handleSpotClick = (index) => {
                // If the spot is already occupied, do nothing
                if (spotImages[index] !== null) return;
            
                // Copy the current state
                const newSpotImages = [...spotImages];
                // Set the clicked spot to the current image (e.g., X or O)
                newSpotImages[index] = images[currentImageIndex];
                setSpotImages(newSpotImages);


                const winner = checkWinner(newSpotImages);
                const winnerSymbol = checkWinner(newSpotImages);
                if (winnerSymbol) {  
                  alert('Player wins!');
                  setScore(score + 1);
                }


            
                // Toggle to the next image
                setCurrentImageIndex((currentImageIndex + 1) % images.length);
              };


              const winnerImage = checkWinner(spotImages);


              // Reset the board by setting all spots to null
  const resetBoard = () => {
        setSpotImages(Array(9).fill(null));
        setCurrentImageIndex(0);
        // Optionally, reset the score if desired:
        // setScore(0);
      };









        // "score" is the variable, "setScore" updates it.
        const { score, setScore } = useContext(ScoreContext);

        // Function that increments the score by 1
        const incrementScore = () => setScore(score + 1);

        const resetScore = () => setScore(0);


  return (
    <>
    



    <div id="gameboard" class="no-highlight">
    {spotImages.map((imgSrc, index) => (
        <div
          key={index}
          className={`spot spot${index + 1}`}
          onClick={() => handleSpotClick(index)}
        >
          {imgSrc && <img src={imgSrc} alt={`Spot ${index + 1}`} />}
        </div>
      ))}
    </div>

    <div className="scores">
              <h1>Your score is: {score}</h1>
              <button onClick={resetBoard}>Reset</button>
          </div>
      
     </>
  );
};

export default SecondPage;