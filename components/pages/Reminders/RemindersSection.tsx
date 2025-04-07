"use client";
import React, { useEffect, useState } from "react";
import ReminderCard from "./ReminderCard";
import { Priority } from "@/models/Reminder";

interface Reminder {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  priority: Priority;
  keywords: string[];
}

export default function RemindersSection() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReminders = async () => {
      try {
        const response = await fetch("/api/reminders");
        if (!response.ok) {
          throw new Error("Failed to fetch reminders");
        }
        const data: Reminder[] = await response.json();
        setReminders(data);
      } catch (err) {
        console.error("Error fetching reminders:", err);
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchReminders();
  }, []);

  if (loading) return <p>Loading reminders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {reminders.map((reminder) => (
          <ReminderCard
            key={reminder.id}
            title={reminder.title}
            description={reminder.description}
            date={reminder.date}
            time={reminder.time}
            priority={reminder.priority}
            keywords={reminder.keywords}
          />
        ))}
      </div>
    </div>
  );
}
