"use client";

import { useAuth } from "@/context/AuthContext";
import { usePersistentQuiz } from "@/hooks/usePersistentQuiz";

export default function Posttest() {
  const { setState } = useAuth();

  const {
    questions,
    currentIndex,
    selected,
    setSelected,
    submitted,
    score,
    answerQuestion,
  } = usePersistentQuiz("posttest-progress");

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    const result = answerQuestion();

    if (result?.isSubmitted) {
      setState((prev) => ({
        ...prev,
        posttestScore: result.score,
      }));
    }
  };

  return (
    <main className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-zinc-900/80 border border-white/10 rounded-xl p-8 text-white">

        <h1 className="text-2xl font-semibold mb-4">Post-Test</h1>

        {!submitted ? (
          <>
            <p className="text-sm text-zinc-400 mb-4">
              Question {currentIndex + 1} of {questions.length}
            </p>

            <p className="font-medium mb-6">
              {currentQuestion.question}
            </p>

            <div className="space-y-3 mb-6">
              {currentQuestion.options.map((opt, i) => (
                <label
                  key={i}
                  className={`flex gap-3 p-3 rounded-md border cursor-pointer
                    ${
                      selected === i
                        ? "border-indigo-500 bg-indigo-500/10"
                        : "border-white/10"
                    }`}
                >
                  <input
                    type="radio"
                    checked={selected === i}
                    onChange={() => setSelected(i)}
                  />
                  {opt}
                </label>
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={selected === null}
              className="w-full bg-indigo-600 py-2.5 rounded-md disabled:opacity-50"
            >
              {currentIndex === questions.length - 1
                ? "Submit Post-Test"
                : "Next Question"}
            </button>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-3">
              Post-Test Complete
            </h2>

            <p className="text-lg mb-4">
              You scored <span className="font-semibold">{score}</span> out of{" "}
              {questions.length}
            </p>

            <p className="text-sm text-zinc-400">
              Thank you for attempting the quiz.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
