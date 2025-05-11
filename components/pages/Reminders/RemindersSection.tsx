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
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [notified, setNotified] = useState<string[]>([]);

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

  // 🔔 Push Notification Logic
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

          setNotified((prev) => [...prev, reminderId!]);
        }
      });
    }, 60000);

    return () => clearInterval(interval);
  }, [reminders, notified]);

  // WhatsApp Reminder Trigger
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
    }, 45000);

    return () => clearInterval(interval);
  }, []);

  const filteredReminders = reminders.filter((reminder) =>
    `${reminder.title} ${reminder.description} ${reminder.keywords.join(" ")}`
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  if (loading) return <p className="p-10">Loading reminders...</p>;
  if (error) return <p className="p-10 text-red-600">Error: {error}</p>;

  return (
    <div className="p-10 pt-0">
      {/* 🔍 Search Input */}
     <div className="mb-4 relative w-full md:w-1/2">
      <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <svg
          className="w-5 h-5 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-4.35-4.35M5 11a6 6 0 1112 0 6 6 0 01-12 0z"
          />
        </svg>
      </span>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search reminders..."
        className="pl-10 pr-4 py-2 w-full rounded-3xl border border-gray-300 shadow-sm focus:ring-1 focus:ring-indigo-500 focus:outline-none transition duration-200 bg-white placeholder-gray-400"
      />
    </div>


      {/* 💬 Reminder Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {filteredReminders.length > 0 ? (
          filteredReminders.map((reminder) => (
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
          ))
        ) : (
          <p className="text-gray-500 col-span-full">No reminders match your search.</p>
        )}
      </div>
    </div>
  );
}
