"use client";

import { useEffect, useState } from "react";
import { QUESTIONS } from "@/data/questions";

export function usePersistentQuiz(storageKey) {
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const saved = localStorage.getItem(storageKey);

    // 🔁 Restore progress if valid
    if (saved) {
      try {
        const data = JSON.parse(saved);

        if (Array.isArray(data.questions) && data.questions.length > 0) {
          setQuizQuestions(data.questions);
          setCurrentIndex(data.currentIndex ?? 0);
          setAnswers(data.answers ?? {});
          setSubmitted(data.submitted ?? false);
          setScore(data.score ?? 0);
          return;
        }
      } catch {
        
      }
    }

    const shuffled = [...QUESTIONS].sort(() => 0.5 - Math.random());
    const selectedQuestions = shuffled.slice(0, 3);

    setQuizQuestions(selectedQuestions);

    localStorage.setItem(
      storageKey,
      JSON.stringify({
        questions: selectedQuestions,
        currentIndex: 0,
        answers: {},
        submitted: false,
        score: 0,
      })
    );
  }, [storageKey]);

  const persist = (data) => {
    localStorage.setItem(storageKey, JSON.stringify(data));
  };

  const answerQuestion = () => {
    const currentQuestion = quizQuestions[currentIndex];
    if (!currentQuestion) return;

    const updatedAnswers = {
      ...answers,
      [currentQuestion.id]: selected,
    };

    let nextIndex = currentIndex;
    let isSubmitted = submitted;
    let finalScore = score;

    if (currentIndex < quizQuestions.length - 1) {
      nextIndex += 1;
    } else {
      finalScore = quizQuestions.reduce((total, q) => {
        return total + (updatedAnswers[q.id] === q.correctIndex ? 1 : 0);
      }, 0);

      isSubmitted = true;
    }

    setAnswers(updatedAnswers);
    setCurrentIndex(nextIndex);
    setSelected(null);
    setSubmitted(isSubmitted);
    setScore(finalScore);

    persist({
      questions: quizQuestions,
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
    questions: quizQuestions,
    currentIndex,
    selected,
    setSelected,
    submitted,
    score,
    answerQuestion,
    reset,
  };
}
