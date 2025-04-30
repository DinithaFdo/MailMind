import React, { useState } from "react";

export default function AISummarization() {
  const [inputText, setInputText] = useState("");
  const [summary, setSummary] = useState("");

  const handleSummarize = () => {
    // Mock summary logic (replace with real API call)
    if (inputText.trim()) {
      setSummary("This is a summarized version of the input text.");
    } else {
      setSummary("Please enter some text to summarize.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow rounded-xl mt-10">
      <h1 className="text-2xl font-bold mb-4">AI Summarization Tool</h1>
      <textarea
        rows={6}
        className="w-full p-3 border border-gray-300 rounded-md mb-4"
        placeholder="Enter text to summarize..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <button
        onClick={handleSummarize}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
        Summarize
      </button>

      {summary && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Summary</h2>
          <p className="mt-2 bg-gray-100 p-4 rounded">{summary}</p>
        </div>
      )}
    </div>
  );
}
