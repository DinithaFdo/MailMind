"use client";

import React, { useState } from "react";
import MailText from "./MailText"; // Assuming MailText is in the same directory
import SummarizeText from "./SummarizeText"; // Assuming SummarizeText is in the same directory

export default function SummarizePage() {
  const [summary, setSummary] = useState<string>("");

  const handleSummaryGenerated = (generatedSummary: string) => {
    setSummary(generatedSummary);
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Summarize Your Email</h1>

      <MailText onSummaryGenerated={handleSummaryGenerated} />

      {/* Pass the summary prop to SummarizeText */}
      <SummarizeText summary={summary} />
    </div>
  );
}
