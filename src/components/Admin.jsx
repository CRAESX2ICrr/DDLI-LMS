"use client";

import { useQuestions } from "@/hooks/useQuestions";

export default function Admin() {
  const {
    visibleQuestions,
    currentPage,
    totalPages,
    setCurrentPage,
    addQuestion,
    updateQuestion,
    updateOption,
    setCorrect,
    deleteQuestion,
    resetQuestions,
  } = useQuestions();

  return (
    <div className="min-h-screen px-6 py-10 text-white">
      {/* Header */}
      <div className="max-w-5xl mx-auto flex items-center justify-between mb-8">
        <h1 className="text-2xl font-semibold">
          Question Editor
        </h1>

    <div className="flex gap-3">
      <button onClick={addQuestion}
       className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm"
      >
        + Add Question
      </button>

      <button
        onClick={resetQuestions}
        className="px-4 py-2 rounded-lg bg-gray-600 hover:bg-gray-500 text-sm"
      >
        Reset
      </button>
    </div>


      </div>

      {/* Question Cards */}
      <div className="max-w-5xl mx-auto space-y-6">
        {visibleQuestions.map((q, qIndex) => (
          <div
            key={q.id}
            className="rounded-2xl bg-black/30 border border-white/10 p-6 space-y-4"
          >
            <textarea
              value={q.question}
              onChange={(e) =>
                updateQuestion(q.id, e.target.value)
              }
              className="w-full rounded-lg bg-black/40 p-3 text-sm resize-none"
            />

            {q.options.map((opt, i) => (                        // Loop through answers
              <div key={i} className="flex gap-3">
                <input
                  type="radio"
                  checked={q.correctIndex === i}
                  onChange={() => setCorrect(q.id, i)}
                />
                <input                                           // retype
                  value={opt}
                  onChange={(e) =>
                    updateOption(q.id, i, e.target.value)
                  }
                  className="flex-1 rounded-lg bg-black/40 px-3 py-2 text-sm"
                />
              </div>
            ))}

            <div className="flex justify-end">
              <button onClick={() => deleteQuestion(q.id)}
                className="px-4 py-1.5 rounded-lg bg-red-500/80 text-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(p => p - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(p => p + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
