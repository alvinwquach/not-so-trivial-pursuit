import "./styles.scss";
import { useState, useEffect } from "react";
import firebase from "./firebase";
import axios from "axios";

function GameSetting(props) {
  const {
    userName,
    SetUserName,
    questionSettingAlready,
    setQuestionSettingAlready,
    setUserQuestions,
    setUserCorrectNumber,
    setUserAnsweredNumber,
    continueGame,
    setContinueGame,
    userNumberChoice,
    setUserNumberChoice,
    setGameResultShows,
    setAnswerCorrect,
    setCurrentQuestionOrder,
    setGameDisplayStart,
    setOpenGameResultWindow,
  } = props;

  const [userNameAlready, setUserNameAlready] = useState(false);
  const [userDifficultyChoice, setUserDifficultyChoice] =
    useState("placeholder");
  const [userCategoryChoice, setUserCategoryChoice] = useState("placeholder");
  const [userTypeChoice, setUserTypeChoice] = useState("placeholder");
  const [existingUser, setExistingUser] = useState(false);
  const [questionsAndAnswersFromApi, setQuestionsAndAnswersFromApi] =
    useState("");

  const userNameUpload = (userName, questionArray) => {
    const dbRef = firebase.database().ref(userName);
    dbRef.set({
      correctNumber: 0,
      answeredNumber: 0,
      questions: questionArray,
    });
  };

  const ContinueGameClick = () => {
    setContinueGame(true);
    setQuestionSettingAlready(true);
  };

  const ExistingUserClick = () => {
    setExistingUser(false);
  };

  useEffect(() => {
    if (questionsAndAnswersFromApi !== "") {
      userNameUpload(userName, questionsAndAnswersFromApi);
    }
  }, [userName, questionsAndAnswersFromApi]);

  // Dropdown
  const handleUserDifficultyChoice = (e) => {
    setUserDifficultyChoice(e.target.value);
  };

  const handleUserCategoryChoice = (e) => {
    setUserCategoryChoice(e.target.value);
  };

  const handleUserNumberChoice = (e) => {
    setUserNumberChoice(e.target.value);
  };

  const handleUserTypeChoice = (e) => {
    setUserTypeChoice(e.target.value);
  };

  //User Name Input
  const UserNameInput = (event) => {
    SetUserName(event.target.value);
  };

  const formSubmission = (event) => {
    event.preventDefault();
  };

  const UserNameSubmission = () => {
    if (userName === "") {
      alert(`Please enter your user name!`);
    } else {
      setUserNameAlready(true);
      console.log(userName);
    }
  };

  const QuestionSettingSubmission = () => {
    if (
      userCategoryChoice === "placeholder" ||
      userTypeChoice === "placeholder" ||
      userDifficultyChoice === "placeholder" ||
      userNumberChoice === "placeholder"
    ) {
      alert(`Please select category, type and difficulty for your questions!`);
    } else {
      setQuestionSettingAlready(true);
    }
  };
  //Check existing user name or create a new one
  useEffect(() => {
    if (userNameAlready) {
      const dbRef = firebase.database().ref();
      dbRef.on("value", (response) => {
        const data = response.val();
        const dataConvertToArray = Object.keys(data);
        if (String(dataConvertToArray).indexOf(userName) !== -1) {
          setExistingUser(true);
          if (continueGame) {
            // Pass existing data to GameDisplay.js
            console.log(data);
            console.log(data[userName]);
            setUserQuestions(data[userName].questions);
            setUserCorrectNumber(data[userName].correctNumber);
            setUserAnsweredNumber(data[userName].answeredNumber);
          }
        }
      });
    }
  }, [
    userName,
    continueGame,
    userNameAlready,
    setUserQuestions,
    setUserCorrectNumber,
    setUserAnsweredNumber,
  ]);

  useEffect(() => {
    if (questionSettingAlready && !existingUser) {
      const triviaGameUrl = `https://opentdb.com/api.php?amount=${userNumberChoice}&category=${userCategoryChoice}&difficulty=${userDifficultyChoice}&type=${userTypeChoice}`;
      axios({
        url: triviaGameUrl,
        method: "GET",
        responseType: "json",
      }).then((response) => {
        const numberUserNumberChoice = parseInt(userNumberChoice, 10);
        if (response.data.results.length !== numberUserNumberChoice) {
          alert("Meet your requirements I cannot. Return home young Jedi.");
          setGameResultShows(0);
          setAnswerCorrect(0);
          setCurrentQuestionOrder(0);
          setQuestionSettingAlready(false);
          setGameDisplayStart(false);
          setOpenGameResultWindow(false);
          setExistingUser(false);
          setUserNameAlready(true);
        }

        if (questionsAndAnswersFromApi === "") {
          setQuestionsAndAnswersFromApi(response.data.results);
        }
        if (!existingUser) {
          setUserQuestions(questionsAndAnswersFromApi);
        }
      });
      console.log(questionsAndAnswersFromApi);
      console.log(userTypeChoice);
      console.log(userDifficultyChoice);
      console.log(userCategoryChoice);
    }
  }, [
    userNumberChoice,
    questionSettingAlready,
    questionsAndAnswersFromApi,
    userTypeChoice,
    userDifficultyChoice,
    userCategoryChoice,
    setQuestionsAndAnswersFromApi,
    existingUser,
    setUserQuestions,
    setGameResultShows,
    setAnswerCorrect,
    setCurrentQuestionOrder,
    setQuestionSettingAlready,
    setGameDisplayStart,
    setOpenGameResultWindow,
  ]);

  return (
    <>
      <section>
        {!userNameAlready ? (
          <form className="userNameInputForm" onSubmit={formSubmission}>
            <label htmlFor="userNameInput">
              Please enter your user name here:
            </label>
            <div>
              <input id="userNameInput" type="text" onChange={UserNameInput} />
              <button onClick={UserNameSubmission}>Submit!</button>
            </div>
          </form>
        ) : null}
        {questionsAndAnswersFromApi ? null : questionSettingAlready ? null : userNameAlready &&
          existingUser ? (
          <div className="continueOrNewGame">
            <button onClick={ContinueGameClick}>Continue your game?</button>
            <button onClick={ExistingUserClick}>Start a new game!</button>
          </div>
        ) : null}
        {questionSettingAlready ? null : !existingUser && userNameAlready ? (
          <div className="dropdownSettingSection">
            <form onSubmit={formSubmission}>
              {/* # of questions selected */}
              <select
                id="amountOfQuestionsSelection"
                name="amountOfQuestionsSelection"
                value={userNumberChoice}
                onChange={handleUserNumberChoice}
              >
                <option value="placeholder" disabled>
                  Choose # of ?'s:
                </option>
                <option value="1">1</option>
                <option value="3">3</option>
                <option value="5">5</option>
                <option value="7">7</option>
                <option value="9">9</option>
                <option value="11">11</option>
              </select>
              {/* Category selection */}
              <select
                id="categorySelection"
                name="categorySelection"
                value={userCategoryChoice}
                onChange={handleUserCategoryChoice}
              >
                <option value="placeholder" disabled>
                  Choose your category:
                </option>
                <option value="21">Sport</option>
                <option value="9">General Knowledge</option>
                <option value="17">Science&Nature</option>
                <option value="12">Music</option>
                <option value="14">Television</option>
                <option value="15">Video Games</option>
                <option value="23">History</option>
              </select>
              {/* Type selection */}
              <select
                id="typeSelection"
                name="typeSelection"
                value={userTypeChoice}
                onChange={handleUserTypeChoice}
              >
                <option value="placeholder" disabled>
                  Choose your type:
                </option>
                <option value="multiple">Multiple Choice</option>
                <option value="boolean">True/False</option>
              </select>
              {/* Difficulty selection */}
              <select
                id="difficulty"
                name="difficulty"
                value={userDifficultyChoice}
                onChange={handleUserDifficultyChoice}
              >
                <option value="placeholder" disabled>
                  Select difficulty:
                </option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </form>
            <button onClick={QuestionSettingSubmission}>
              Generate Questions!
            </button>
          </div>
        ) : null}
      </section>
    </>
  );
}

export default GameSetting;
