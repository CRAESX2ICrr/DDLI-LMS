"use client";

import { useAuth } from "@/context/AuthContext";
import { usePersistentQuiz } from "@/hooks/usePersistentQuiz";

export default function Pretest() {
  const { setState } = useAuth();

  const {
    questions,                                                        // array quiz quest
    currentIndex,                                                     // index current question
    selected,                                                         // selected answer index for current question
    setSelected,                                                      // setter for selected answer
    submitted,                                                        // bool: quiz comp/not
    score,            
    answerQuestion,                                                   // validates answer and advances quiz
    reset,                                                            // clears quiz progress from stor
  } = usePersistentQuiz("pretest-progress");

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];

  const handleNext = () => {
    const result = answerQuestion();

    if (result?.isSubmitted) {
      setState((prev) => ({
        ...prev,
        pretestScore: result.score,
      }));
    }
  };

  const handleContinue = () => {
    reset();
    setState((prev) => ({ ...prev, step: "VIDEO" }));
  };

  return (
    <main className="min-h-[calc(100vh-72px)] flex items-center justify-center px-4">
      <div className="w-full max-w-2xl bg-zinc-900/80 border border-white/10 rounded-xl p-8 text-white">

        <h1 className="text-2xl font-semibold mb-4">Pre-Test</h1>

        {!submitted ? (
          <>
            <p className="text-sm text-zinc-400 mb-4">
              Question {currentIndex + 1} of {questions.length}             { /* quest x of 4*/}
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
                      selected === i ? "border-indigo-500 bg-indigo-500/10" : "border-white/10"                   // ans cg looks whether select !*
                    }`}
                >
                  <input
                    type="radio"
                    checked={selected === i}
                    onChange={() => setSelected(i)}
                  />
                  {opt}
                </label>                                   // answer text + radio
              ))}
            </div>

            <button
              onClick={handleNext}
              disabled={selected === null}
              className="w-full bg-indigo-600 py-2.5 rounded-md disabled:opacity-50"
            >
              {currentIndex === questions.length - 1 ? "Submit Pre-Test" : "Next Question"}
            </button>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-2">Pre-Test Complete</h2>
            <p className="text-lg mb-6">
              You scored {score} out of {questions.length}
            </p>

            <button
              onClick={handleContinue}
              className="px-8 py-2 rounded-full bg-indigo-600 text-sm"
            >
              Continue to Video
            </button>
          </div>
        )}
      </div>
    </main>
  );
}
