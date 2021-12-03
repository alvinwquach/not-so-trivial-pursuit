import { useState, useEffect } from "react";
import "../styles.scss";
import { Link } from "react-router-dom";

function GameResult(props) {
  const {
    currentQuestionOrder,
    answeredCorrect,
    userName,
    gameResultShows,
    setGameResultShows,
    setAnswerCorrect,
    setCurrentQuestionOrder,
    setGameStart,
    setQuestionSettingAlready,
    setGameDisplayStart,
    setOpenGameResultWindow,
  } = props;
  const [currentScore, setCurrentScore] = useState(0);

  const QuitClick = () => {
    setGameResultShows(0);
    setAnswerCorrect(0);
    setCurrentQuestionOrder(0);
    setGameStart(false);
    setQuestionSettingAlready(false);
    setGameDisplayStart(false);
    setOpenGameResultWindow(false);
  };

  useEffect(() => {
    if (currentQuestionOrder > 0) {
      setCurrentScore(answeredCorrect);
    } else {
      setCurrentScore(0);
    }
  }, [answeredCorrect, currentQuestionOrder]);

  useEffect(() => {
    const rightAnswer = answeredCorrect;
    const wrongAnswers = currentQuestionOrder - answeredCorrect;
    if (rightAnswer > wrongAnswers) {
      setGameResultShows(1);
    } else if (wrongAnswers > rightAnswer) {
      setGameResultShows(2);
    } else if (wrongAnswers === rightAnswer && currentQuestionOrder !== 0) {
      setGameResultShows(3);
    }
    console.log(rightAnswer);
    console.log(wrongAnswers);
  }, [answeredCorrect, currentQuestionOrder, setGameResultShows]);
  return (
    <div className="resultSection">
      <p className="resultUserName">{userName}</p>
      {gameResultShows === 0 ? (
        <>
          <p>You are ready to go!</p>
        </>
      ) : gameResultShows === 1 ? (
        <>
          <p>You win!</p>
          <p>
            Your score is: <span>{currentScore}</span>
          </p>
        </>
      ) : gameResultShows === 2 ? (
        <>
          <p>You lose!</p>
          <p>Your score is: {currentScore}</p>
        </>
      ) : gameResultShows === 3 ? (
        <>
          <p>You tie!</p>
        </>
      ) : (
        <>
          <p>You are ready to go!</p>
        </>
      )}
      <Link to="/">
        <button className="quitButton" onClick={QuitClick}>
          Quit The Game
        </button>
      </Link>
    </div>
  );
}

export default GameResult;
