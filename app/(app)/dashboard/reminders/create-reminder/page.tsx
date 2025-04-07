"use client";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import Link from "next/link";

const priorities = ["High", "Medium", "Low"] as const;
type Priority = (typeof priorities)[number];

const CreateReminder: React.FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [priority, setPriority] = useState<Priority>("Medium");
  const [keywords, setKeywords] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Get today's date and tomorrow's date in the correct format (yyyy-mm-dd)
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);

  const todayString = today.toISOString().split("T")[0]; // Format to yyyy-mm-dd

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/reminders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          date,
          time,
          priority,
          keywords: keywords
            .split(",")
            .map((k) => k.trim())
            .filter((k) => k),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to create reminder");
      }

      const data = await response.json();
      console.log("Reminder created:", data);
      router.push("/dashboard/reminders"); // Redirect to home or reminders list
    } catch (error) {
      console.error("Error creating reminder:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="">
      <div className="">
        <div className="p-10">
          <h1 className="text-4xl font-medium">Welcome Back to Reminders 👋</h1>
          <p className="text-lg font-medium text-gray-400 max-w-xl mt-3">
            Get timely reminders for important deadlines and upcoming events.
            Stay organized and never miss a thing.
          </p>
          <div className="mt-4">
            <Link href={"/dashboard/reminders"}>
              <Button>All Reminders</Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="max-w-3xl bg-white rounded-2xl p-10">
        <h2 className="text-xl font-bold mb-4">Create Reminder</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            min={todayString} // Disable past dates
          />
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
          <select
            className="w-full p-2 border rounded-lg"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            required>
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p} Priority
              </option>
            ))}
          </select>
          <Input
            placeholder="Keywords (comma-separated)"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Creating..." : "Create Reminder"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CreateReminder;
