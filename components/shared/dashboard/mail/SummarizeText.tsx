"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useState } from "react";
import { FaSave } from "react-icons/fa";
import { VscSaveAll } from "react-icons/vsc";
import { useUser } from "@clerk/nextjs";
import { useForm } from "react-hook-form";
import { toast } from "sonner"; // SchadCN Toast component

export default function SummarizeText() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    mode: "onChange",
  });

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);

    // Validation for empty summary (handled by react-hook-form)
    if (!data.summary || data.summary.trim() === "") {
      toast.error("Summary cannot be empty.");
      setIsSubmitting(false);
      return;
    }

    // Validation for summary length
    if (data.summary.length < 10) {
      toast.error("Summary is too short. It must be at least 10 characters.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch("/api/summarizations", {
        method: "POST",
        body: JSON.stringify({
          summary: data.summary,
          name: `Summarization - ${new Date().toLocaleString()}`, // Dynamic name
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Display success message
        toast.success("Summarization saved successfully!");

        // Redirect to All Summarizations page
        window.location.href = "/summarization-history";
      } else {
        // Error handling
        toast.error("There was an issue saving your summarization.");
      }
    } catch (error) {
      console.error(error);
      toast.warning("Something went wrong. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="p-6">
      <div className="grid w-full gap-2">
        <Textarea
          placeholder="Type your message here."
          className="h-60 font-medium"
          {...register("summary", { required: "Summary is required." })}
        />
        {/* Showing required validation error with red text */}
        {errors.summary && (
          <p className="text-red-500 text-sm">{errors.summary.message}</p>
        )}

        <div className="flex items-center gap-2 w-full">
          <Button
            className="w-1/2 bg-indigo-200 text-indigo-500 hover:text-white hover:cursor-pointer"
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting}
          >
            <FaSave />
            Save to Bucket
          </Button>
          <Button
            className="w-1/2 bg-indigo-200 text-indigo-500 hover:text-white hover:cursor-pointer"
            onClick={() => (window.location.href = "/summarization-history")}
          >
            <VscSaveAll />
            All Summarize List
          </Button>
        </div>
      </div>
    </div>
  );
}
