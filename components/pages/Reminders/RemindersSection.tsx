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
  const [notified, setNotified] = useState<string[]>([]); // ✅ To avoid repeat notifications

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

  // 🔔 Push Notification Only (No DB update)
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();

      reminders.forEach((reminder) => {
        const reminderTime = new Date(`${reminder.date}T${reminder.time}`);
        const reminderId = reminder._id || reminder.id;

        if (
          !reminder.isCompleted &&
          reminderTime <= now &&
          !notified.includes(reminderId!)
        ) {
          if (Notification.permission === "granted") {
            new Notification("🚨 Reminder Alert!", {
              body: `${reminder.title} - ${reminder.description}`,
              icon: "/LOGO.png",
              badge: "/badge-icon.png",
              requireInteraction: true,
              tag: reminderId,
            });

            const audio = new Audio("/reminder-sound.mp3");
            audio.play().catch(() =>
              console.log("Autoplay blocked, needs user interaction.")
            );
          }

          // ✅ Only mark as locally shown
          setNotified((prev) => [...prev, reminderId!]);
        }
      });
    }, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [reminders, notified]);

  // ✅ Trigger WhatsApp reminders from client every 60s (temporary fix)
  useEffect(() => {
    const interval = setInterval(() => {
      fetch("/api/trigger-reminders")
        .then((res) => res.json())
        .then((data) => {
          console.log("⏱️ Triggered WhatsApp check from client:", data);
        })
        .catch((err) => {
          console.error("❌ Failed to trigger reminders:", err);
        });
      }, 45000); // every 45 seconds

    return () => clearInterval(interval);
  }, []);

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
