import "./styles.scss";
import GameSetting from "./components/GameSetting";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import GameDisplay from "./components/GameDisplay";
import GameResult from "./components/GameResult";
import LogoImage from "./images/logo.png";
import Footer from "./components/Footer";

function App() {
  const [gameStart, setGameStart] = useState(false);
  const [userName, SetUserName] = useState(""); //Pass to GameSetting
  const [questionSettingAlready, setQuestionSettingAlready] = useState(false); //Pass to GameSetting
  const [gameDisplayStart, setGameDisplayStart] = useState(false);
  const [userQuestions, setUserQuestions] = useState(""); // To store the users questions from Firebase (pass to GameSetting)
  const [userCorrectNumber, setUserCorrectNumber] = useState(0); // To store the users correct number from Firebase (pass to GameSetting)
  const [userAnsweredNumber, setUserAnsweredNumber] = useState(0); // To store the users answered questions number from Firebase (pass to GameSetting)
  const [continueGame, setContinueGame] = useState(false); //Pass to GameSetting
  const [currentQuestionOrder, setCurrentQuestionOrder] = useState(0);
  const [answeredCorrect, setAnswerCorrect] = useState(0);
  const [userNumberChoice, setUserNumberChoice] = useState("placeholder"); //Pass to GameSetting and GameDisplay
  const [openGameResultWindow, setOpenGameResultWindow] = useState(false);
  const [gameResultShows, setGameResultShows] = useState(0);

  useEffect(() => {
    const numberUserNumberChoice = parseInt(userNumberChoice, 10);
    if (currentQuestionOrder === numberUserNumberChoice) {
      setOpenGameResultWindow(true);
    }
  }, [currentQuestionOrder, userNumberChoice, setOpenGameResultWindow]);

  const GameStartClick = () => {
    setGameStart(true);
  };

  const GameDisplayStartClick = () => {
    setGameDisplayStart(true);
  };

  const HomePageClick = () => {
    setGameResultShows(0);
    setAnswerCorrect(0);
    setCurrentQuestionOrder(0);
    setGameStart(false);
    setQuestionSettingAlready(false);
    setGameDisplayStart(false);
    setOpenGameResultWindow(false);
  };

  const GameResultClick = () => {
    setOpenGameResultWindow(!openGameResultWindow);
  };

  return (
    <Router>
      <section className="App">
        <nav className={gameStart ? "movingNav" : null}>
          <div>
            <Link to="/">
              <button className="homePageButton" onClick={HomePageClick}>
                Home
              </button>
            </Link>
            <button className="resultPageButton" onClick={GameResultClick}>
              Result
            </button>
          </div>
        </nav>

        <img
          className={gameStart ? "logoImage logoHide" : "logoImage"}
          src={LogoImage}
          alt="Website logo"
        />

        {!gameStart ? (
          <Link to="/gamesetting/*">
            <button className="gameStartButton" onClick={GameStartClick}>
              Let's Start The Game!
            </button>
          </Link>
        ) : null}
        {gameDisplayStart ? null : questionSettingAlready ? (
          <Link to="/gamedisplay/*">
            <button
              className="triviaGameStartbutton"
              onClick={GameDisplayStartClick}
            >
              Trivia Game Start!
            </button>
          </Link>
        ) : null}
        <Footer />

        {openGameResultWindow ? (
          <GameResult
            currentQuestionOrder={currentQuestionOrder}
            answeredCorrect={answeredCorrect}
            userName={userName}
            gameResultShows={gameResultShows}
            setGameResultShows={setGameResultShows}
            setAnswerCorrect={setAnswerCorrect}
            setCurrentQuestionOrder={setCurrentQuestionOrder}
            setGameStart={setGameStart}
            setQuestionSettingAlready={setQuestionSettingAlready}
            setGameDisplayStart={setGameDisplayStart}
            setOpenGameResultWindow={setOpenGameResultWindow}
          />
        ) : null}
      </section>
      <Routes>
        <Route
          path="/gamesetting/*"
          element={
            <GameSetting
              userName={userName}
              SetUserName={SetUserName}
              questionSettingAlready={questionSettingAlready}
              userQuestions={userQuestions}
              setUserQuestions={setUserQuestions}
              setUserCorrectNumber={setUserCorrectNumber}
              setUserAnsweredNumber={setUserAnsweredNumber}
              continueGame={continueGame}
              setContinueGame={setContinueGame}
              userNumberChoice={userNumberChoice}
              setUserNumberChoice={setUserNumberChoice}
              setGameResultShows={setGameResultShows}
              setAnswerCorrect={setAnswerCorrect}
              setCurrentQuestionOrder={setCurrentQuestionOrder}
              setGameStart={setGameStart}
              setQuestionSettingAlready={setQuestionSettingAlready}
              setGameDisplayStart={setGameDisplayStart}
              setOpenGameResultWindow={setOpenGameResultWindow}
            />
          }
        />
        <Route
          path="/gamedisplay/*"
          element={
            <GameDisplay
              userQuestions={userQuestions}
              userName={userName}
              userCorrectNumber={userCorrectNumber}
              userAnsweredNumber={userAnsweredNumber}
              continueGame={continueGame}
              currentQuestionOrder={currentQuestionOrder}
              setCurrentQuestionOrder={setCurrentQuestionOrder}
              answeredCorrect={answeredCorrect}
              setAnswerCorrect={setAnswerCorrect}
              userNumberChoice={userNumberChoice}
              setUserNumberChoice={setUserNumberChoice}
              setOpenGameResultWindow={setOpenGameResultWindow}
              openGameResultWindow={openGameResultWindow}
            />
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
