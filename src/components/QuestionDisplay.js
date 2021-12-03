import "../styles.scss";
import { useState, useEffect } from "react";
import LukeSkywalker from "../images/lukeSkywalker.png";
import DarthMaul from "../images/darthMaul.png";
import useSound from "use-sound";
import LightSaberAttackSound from "../audio/lightSaberAttack.mp3";

function QuestionDisplay(props) {
  const {
    currentQuestion,
    currentQuestionOrder,
    setCurrentQuestionOrder,
    answeredCorrect,
    setAnswerCorrect,
  } = props;

  const [randomAnswers, setRandomAnswers] = useState([]);
  const [whoWon, setWhoWon] = useState("");

  useEffect(() => {
    console.log("AC2 Current Question");
    console.log(currentQuestion);

    const rightAnswer = currentQuestion.correct_answer;
    const wrongAnswers = currentQuestion.incorrect_answers;
    console.log(rightAnswer);
    console.log(wrongAnswers);
    if (wrongAnswers !== undefined) {
      const answers = [...wrongAnswers, rightAnswer];
      // const shuffleAnswers = shuffle(answers);
      const shuffleAnswers = answers.sort();
      setRandomAnswers(shuffleAnswers);
    }
  }, [currentQuestion]);

  const booleanTrueClick = () => {
    if (currentQuestion.correct_answer === "True") {
      setAnswerCorrect(answeredCorrect + 1);
      alert("You got it!");
      setWhoWon("luke");
    } else {
      alert("You did not get it!");
      setWhoWon("maul");
    }
    setTimeout(function () {
      setWhoWon("");
    }, 2001);
  };

  const booleanFalseClick = () => {
    if (currentQuestion.correct_answer === "False") {
      setAnswerCorrect(answeredCorrect + 1);
      alert("You got it!");
      setWhoWon("luke");
    } else {
      alert("You did not get it!");
      setWhoWon("maul");
    }
    setTimeout(function () {
      setWhoWon("");
    }, 2001);
  };
  //For multiple choice
  const multipleClick = (e) => {
    console.log(e.target.value);
    console.log(currentQuestion.correct_answer);
    if (e.target.value === currentQuestion.correct_answer) {
      setAnswerCorrect(answeredCorrect + 1);
      alert("You got it!");
      setWhoWon("luke");
    } else {
      alert("You did not get it!");
      setWhoWon("maul");
    }
    setTimeout(function () {
      setWhoWon("");
    }, 2001);
  };

  // set to stop at question 11
  const ClickAnAnswerAndGoToNextQuestion = () => {
    setCurrentQuestionOrder(currentQuestionOrder + 1);
  };

  const [playLightSaberAttackSound] = useSound(LightSaberAttackSound, {
    volume: 0.25,
  });

  useEffect(() => {
    if (whoWon === "maul" || whoWon === "luke") {
      playLightSaberAttackSound();
    }
  }, [whoWon, playLightSaberAttackSound]);

  return (
    <>
      <div className="animationContainer">
        <img
          className={
            whoWon === "luke"
              ? "darthMaul lukeWondarthMaul"
              : whoWon === "maul"
              ? "darthMaul maulWondarthMaul"
              : "darthMaul"
          }
          src={DarthMaul}
          alt="DarthMaul is ready to fight!"
        />
        <img
          className={
            whoWon === "luke"
              ? "lukeSkywalker lukeWondarthLuke"
              : whoWon === "maul"
              ? "lukeSkywalker maulWondarthLuke"
              : "lukeSkywalker"
          }
          src={LukeSkywalker}
          alt="Luke Skywalker is ready to fight!"
        />
      </div>
      <div className="questionContainer">
        {/*get rid of ugly text*/}
        <div
          className="questionText"
          dangerouslySetInnerHTML={{ __html: currentQuestion.question }}
        ></div>
        {currentQuestion.type === "multiple" ? (
          <>
            {randomAnswers.map((answer, index) => (
              <button
                className="buttonAnswer"
                value={answer}
                key={index}
                onClick={(e) => {
                  multipleClick(e);
                  ClickAnAnswerAndGoToNextQuestion();
                }}
                dangerouslySetInnerHTML={{ __html: answer }}
              ></button>
            ))}
          </>
        ) : null}
        {currentQuestion.type === "boolean" ? (
          <>
            <button
              className="buttonAnswer"
              onClick={() => {
                booleanTrueClick();
                ClickAnAnswerAndGoToNextQuestion();
              }}
            >
              True
            </button>
            <button
              className="buttonAnswer"
              onClick={() => {
                booleanFalseClick();
                ClickAnAnswerAndGoToNextQuestion();
              }}
            >
              False
            </button>
          </>
        ) : null}
      </div>
    </>
  );
}

export default QuestionDisplay;
