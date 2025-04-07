"use client";
import React, { useEffect, useState } from "react";
import SummaryCard from "./SummaryCard";

type Summary = {
  id: string;
  date: string;
  time: string;
  summary: string;
  keywords: string[];
};

export default function SummarySection() {
  const [summaries, setSummaries] = useState<Summary[]>([]);

  // Fetch summaries
  useEffect(() => {
    fetch("/api/summaries")
      .then((res) => res.json())
      .then((data) => setSummaries(data));
  }, []);

  return (
    <div className="py-20">
      <div className="grid grid-cols-2 gap-10">
        {summaries.map((summary) => (
          <SummaryCard
            key={summary.id}
            date={summary.date}
            time={summary.time}
            summary={summary.summary}
            keywords={summary.keywords}
          />
        ))}
      </div>
    </div>
  );
}
