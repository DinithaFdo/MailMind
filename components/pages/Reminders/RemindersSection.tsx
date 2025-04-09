"use client";

import React, { useEffect, useState } from "react";
import ReminderCard from "./ReminderCard";

type Priority = "High" | "Medium" | "Low";

interface Reminder {
  id?: string;
  _id?: string;
  title: string;
  description: string;
  date: string;
  time: string;
  priority: Priority;
  keywords: string[];
  isCompleted?: boolean;
}

export default function RemindersSection() {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchReminders = async () => {
    try {
      const response = await fetch("/api/reminders");
      if (!response.ok) throw new Error("Failed to fetch reminders");

      const data: Reminder[] = await response.json();
      setReminders(data);
    } catch (err) {
      console.error("Error fetching reminders:", err);
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Initial fetch
  useEffect(() => {
    fetchReminders();
  }, []);

  // Request Notification Permission
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

  // Reminder Timer Checker
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      reminders.forEach(async (reminder) => {
        if (!reminder.isCompleted) {
          const reminderTime = new Date(`${reminder.date}T${reminder.time}`);
          if (reminderTime <= now) {
            // 🔔 Show Notification
            if (Notification.permission === "granted") {
              new Notification("🚨 Reminder Alert!", {
                body: `${reminder.title} - ${reminder.description}`,
                icon: "/LOGO.png", 
                badge: "/badge-icon.png",
                requireInteraction: true,
                tag: reminder._id || reminder.id,
              });

              // Optional sound
              const audio = new Audio("/reminder-sound.mp3");
              audio.play().catch(() =>
                console.log("Autoplay blocked, needs user interaction.")
              );
            }

            // ✅ Mark as completed
            await fetch(`/api/reminders/${reminder._id || reminder.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ isCompleted: true }),
            });

            // 🔄 Refresh reminders
            fetchReminders();
          }
        }
      });
    }, 60000); // every 60s

    return () => clearInterval(interval);
  }, [reminders]);

  if (loading) return <p>Loading reminders...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="p-10 pt-0">
      

      {/* 💬 Reminder Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {reminders.map((reminder) => (
          <ReminderCard
            key={reminder._id || reminder.id}
            id={reminder._id || reminder.id}
            title={reminder.title}
            description={reminder.description}
            date={reminder.date}
            time={reminder.time}
            priority={reminder.priority}
            keywords={reminder.keywords}
            onDeleteSuccess={fetchReminders}
          />
        ))}
      </div>
    </div>
  );
}
