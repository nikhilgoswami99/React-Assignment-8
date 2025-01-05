// components/Quiz.js
import React, { useState, useEffect } from "react";

const Quiz = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(5);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [quizEnded, setQuizEnded] = useState(false);

  useEffect(() => {
    fetch(
      "https://opentdb.com/api.php?amount=10&category=18&difficulty=medium&type=multiple"
    )
      .then((response) => response.json())
      .then((data) => {
        const formattedQuestions = data.results.map((item) => {
          const incorrectAnswers = item.incorrect_answers;
          const correctAnswer = item.correct_answer;
          const answers = [...incorrectAnswers, correctAnswer].sort(
            () => Math.random() - 0.5
          );
          return {
            question: item.question,
            answers,
            correctAnswer,
          };
        });
        setQuestions(formattedQuestions);
      });
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
    }
    const timer = setTimeout(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestion].correctAnswer) {
      setScore((prevScore) => prevScore + 1);
    }
    handleNextQuestion();
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedAnswer(null);
      setTimeLeft(5);
    } else {
      setQuizEnded(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setTimeLeft(5);
    setQuizEnded(false);
  };

  if (questions.length === 0) return <div>Loading...</div>;

  if (quizEnded) {
    return (
      <div className="quiz-ended">
        <h1>Quiz Completed!</h1>
        <p>Your Score: {score} / {questions.length}</p>
        <button onClick={handleRestart}>Restart Quiz</button>
      </div>
    );
  }

  return (
    <div className="quiz">
      <h1>Quiz App</h1>
      <div className="progress">
        Question {currentQuestion + 1} of {questions.length}
      </div>
      <h2
        dangerouslySetInnerHTML={{
          __html: questions[currentQuestion].question,
        }}
      />
      <div className="answers">
        {questions[currentQuestion].answers.map((answer, index) => (
          <button
            key={index}
            className={`answer ${
              selectedAnswer === answer ? "selected" : ""
            }`}
            onClick={() => handleAnswerClick(answer)}
          >
            {answer}
          </button>
        ))}
      </div>
      <div className="timer">Time Left: {timeLeft} seconds</div>
    </div>
  );
};

export default Quiz;
