"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import React, { useEffect, useState } from "react";
import { FaSave } from "react-icons/fa";
import { VscSaveAll } from "react-icons/vsc";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

interface SummarizeTextProps {
  summary: string;
}

export default function SummarizeText({ summary }: SummarizeTextProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      summary: "",
    },
  });

  // Update textarea when summary prop changes
  useEffect(() => {
    setValue("summary", summary);
  }, [summary, setValue]);

  const onSubmit = async (data: { summary: string }) => {
    setIsSubmitting(true);

    if (!data.summary || data.summary.trim() === "") {
      toast.error("Summary cannot be empty.");
      setIsSubmitting(false);
      return;
    }

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
          name: `Summarization - ${new Date().toLocaleString()}`,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        toast.success("Summarization saved successfully!");
        window.location.href = "/summarization-history";
      } else {
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
    <div className="p-2">
      <div className="grid w-full gap-2">
        <Textarea
          placeholder="AI generated summary will appear here..."
          className="h-60 font-medium"
          {...register("summary", { required: "Summary is required." })}
        />
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
