"use client";

import { useEffect, useState, useMemo } from "react";
import { QUESTIONS } from "@/data/questions";

const QUESTIONS_PER_PAGE = 10;
const STORAGE_KEY = "lms-questions";

export function useQuestions() {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  /* INIT */
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      setQuestions(JSON.parse(saved));
    } else {
      setQuestions(QUESTIONS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(QUESTIONS));
    }
  }, []);

  /* PERSIST */
  const persist = (updated) => {
    setQuestions(updated);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  };

  /*  CRUD */
  const updateQuestion = (id, text) => {
    persist(
      questions.map(q =>
        q.id === id ? { ...q, question: text } : q
      )
    );
  };

  const updateOption = (id, index, text) => {
    persist(
      questions.map(q =>
        q.id === id
          ? {
              ...q,
              options: q.options.map((o, i) =>
                i === index ? text : o
              ),
            }
          : q
      )
    );
  };

  const setCorrect = (id, index) => {
    persist(
      questions.map(q =>
        q.id === id ? { ...q, correctIndex: index } : q
      )
    );
  };

  const deleteQuestion = (id) => {
    persist(questions.filter(q => q.id !== id));
  };

  const addQuestion = () => {
    persist([
      ...questions,
      {
        id: Date.now(),
        question: "New question",
        options: ["Option 1", "Option 2", "Option 3", "Option 4"],
        correctIndex: 0,
      },
    ]);
  };

  /* PAGINATION */
  const totalPages = Math.ceil(
    questions.length / QUESTIONS_PER_PAGE
  );

  const visibleQuestions = useMemo(() => {
    const start = (currentPage - 1) * QUESTIONS_PER_PAGE;
    return questions.slice(start, start + QUESTIONS_PER_PAGE);
  }, [questions, currentPage]);

  return {
    questions,
    visibleQuestions,
    currentPage,
    totalPages,
    setCurrentPage,
    addQuestion,
    updateQuestion,
    updateOption,
    setCorrect,
    deleteQuestion,
  };
}
