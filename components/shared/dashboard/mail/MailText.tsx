"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { WiStars } from "react-icons/wi";
import { FaPaste, FaCopy } from "react-icons/fa"; // Add the paste and copy icons
import { toast } from "sonner";

interface MailTextProps {
  onSummaryGenerated: (summary: string) => void;
}

export default function MailText({ onSummaryGenerated }: MailTextProps) {
  const [emailBody, setEmailBody] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [summary, setSummary] = useState("");

  const handleSummarize = async () => {
    if (!emailBody.trim()) {
      toast.error("Email body is required.");
      return;
    }

    if (emailBody.trim().length < 20) {
      toast.error("Email body is too short. Minimum 20 characters required.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch("/api/summarize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emailBody }),
      });

      const data = await res.json();

      if (res.ok && data.summary) {
        toast.success("Summary generated successfully!");
        setSummary(data.summary); // Store the summary in state
        onSummaryGenerated(data.summary);
      } else {
        toast.error(data.error || "Failed to generate summary.");
      }
    } catch (err) {
      toast.error("Error communicating with AI summarizer.");
    } finally {
      setIsLoading(false);
    }
  };

  // Handle paste action (paste the clipboard content)
  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setEmailBody(clipboardText);
      toast.success("Pasted content successfully!");
    } catch (err) {
      toast.error("Failed to paste content.");
    }
  };

  // Handle copy action (copy the summarized text)
  const handleCopy = async () => {
    try {
      if (summary) {
        await navigator.clipboard.writeText(summary);
        toast.success("Summary copied to clipboard!");
      } else {
        toast.error("No summary available to copy.");
      }
    } catch (err) {
      toast.error("Failed to copy summary.");
    }
  };

  return (
    <div className="p-2 relative">
      <div className="grid w-full gap-2">
        <div className="relative">
          <Textarea
            placeholder="Paste or type your email message here..."
            className="h-60 font-medium" // Add padding-right for the paste icon
            value={emailBody}
            onChange={(e) => setEmailBody(e.target.value)}
          />
          {/* Paste Button inside the Textarea */}
          <button
            className="absolute bottom-4 right-4 p-2 bg-indigo-200 text-indigo-500 rounded-full hover:bg-indigo-300 hover:text-white"
            onClick={handlePaste}
            title="Paste text"
          >
            <FaPaste />
          </button>
        </div>

        <Button
          className="bg-indigo-200 text-indigo-500 hover:text-white hover:cursor-pointer"
          onClick={handleSummarize}
          disabled={isLoading}
        >
          <WiStars />
          {isLoading ? "Summarizing..." : "Summarize with AI"}
        </Button>
      </div>

      {/* Copy Button (only visible when a summary exists) */}
      {summary && (
        <button
          className="absolute bottom-4 right-16 p-2 bg-green-200 text-green-500 rounded-full hover:bg-green-300 hover:text-white"
          onClick={handleCopy}
          title="Copy summary"
        >
          <FaCopy />
        </button>
      )}
    </div>
  );
}
