"use client";

import React, { useEffect, useState } from "react";
import ReminderCard from "./ReminderCard";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

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

  useEffect(() => {
    fetchReminders();
  }, []);

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);

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

  const handleGenerateReport = () => {
  const doc = new jsPDF();
  const currentDate = new Date().toLocaleString();

  // 🖼️ Add logo (local PNG in /public/logo.png)
  const logoUrl = "/MailMind Logo.png"; 
  const img = new Image();
  img.src = logoUrl;

  img.onload = () => {
    doc.addImage(img, "PNG", 150, 10, 40, 12); // Right top corner

    // 🧾 Header Text
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.text("MailMind – Reminders Report", 14, 20);

    // 📅 Generated Date
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${currentDate}`, 14, 27);

    // 📊 Table Data
    const tableColumn = ["Title", "Description", "Date", "Time", "Priority", "Keywords"];
    const tableRows: string[][] = [];

    filteredReminders.forEach((reminder) => {
      const reminderData = [
        reminder.title,
        reminder.description,
        reminder.date,
        reminder.time,
        reminder.priority,
        reminder.keywords.join(", "),
      ];
      tableRows.push(reminderData);
    });

    // 📐 Table Styling
    autoTable(doc, {
      startY: 32,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      headStyles: {
        fillColor: [63, 81, 181], // Indigo
        textColor: 255,
        fontSize: 11,
      },
      bodyStyles: {
        fontSize: 10,
        cellPadding: 3,
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      styles: {
        halign: "left",
        valign: "middle",
      },
      margin: { top: 10, bottom: 20 },
    });

    doc.save("reminders-report.pdf");
  };
};



  if (loading) return <p className="p-10">Loading reminders...</p>;
  if (error) return <p className="p-10 text-red-600">Error: {error}</p>;

  return (
    <div className="p-10 pt-0">
      {/* 🔍 Search + Report Button */}
      <div className="flex justify-between items-center mb-6 flex-wrap gap-3">
        <div className="relative w-full md:w-2/3">
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

        <button
          onClick={handleGenerateReport}
          className="bg-indigo-600 text-white text-sm px-4 py-1.5 rounded-full shadow hover:bg-indigo-700 transition mb-2"
        >
          Download Report
        </button>
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
