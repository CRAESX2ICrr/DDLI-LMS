import { useEffect, useState } from "react";
import { QUESTIONS } from "@/data/questions";

export function usePersistentQuiz(storageKey) {
  const [questions, setQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  // Restore or initialize
  useEffect(() => {
    const saved = localStorage.getItem(storageKey);

    if (saved) {
      const data = JSON.parse(saved);
      setQuestions(data.questions);
      setCurrentIndex(data.currentIndex);
      setAnswers(data.answers);
      setSubmitted(data.submitted);
      setScore(data.score);
      return;
    }

    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 3);

    const initial = {
      questions: selectedQuestions,
      currentIndex: 0,
      answers: {},
      submitted: false,
      score: 0,
    };

    setQuestions(selectedQuestions);
    localStorage.setItem(storageKey, JSON.stringify(initial));
  }, [storageKey]);

  const persist = (data) => {
    localStorage.setItem(storageKey, JSON.stringify(data));
  };

  const answerQuestion = () => {
    const currentQuestion = questions[currentIndex];
    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: selected,
    };

    let nextIndex = currentIndex;
    let isSubmitted = submitted;
    let finalScore = score;

    if (currentIndex < questions.length - 1) {
      nextIndex += 1;
    } else {
      let total = 0;
      questions.forEach((q) => {
        if (updatedAnswers[q.id] === q.correctIndex) {
          total += 1;
        }
      });

      finalScore = total;
      isSubmitted = true;
    }

    setAnswers(updatedAnswers);
    setCurrentIndex(nextIndex);
    setSelected(null);
    setSubmitted(isSubmitted);
    setScore(finalScore);

    persist({
      questions,
      currentIndex: nextIndex,
      answers: updatedAnswers,
      submitted: isSubmitted,
      score: finalScore,
    });

    return { isSubmitted, score: finalScore };
  };

  const reset = () => {
    localStorage.removeItem(storageKey);
  };

  return {
    questions,
    currentIndex,
    selected,
    setSelected,
    submitted,
    score,
    answerQuestion,
    reset,
  };
}
