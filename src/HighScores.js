// ThirdPage.js
import React, { useContext  } from 'react';
import { ScoreContext } from './ScoreContext';



const ThirdPage = () => {


        // "score" is the variable, "setScore" updates it.
        const { score, setScore } = useContext(ScoreContext);

        // Function that increments the score by 1
        const incrementScore = () => setScore(score + 1);


  return (
    <><div>
          <h1>This is the Third Page</h1>
          <p>Welcome to your third page!</p>
      </div><div className="App">
              <h1>Your score is: {score}</h1>
              <button onClick={incrementScore}>Increase Score</button>
          </div></>
  );
};

export default ThirdPage;