"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table"; // Replace with correct import path

interface Reminder {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  priority: string;
  keywords: string[];
}

const ReminderTable: React.FC = () => {
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
      <h1 className="text-4xl font-medium mb-4">Reminder List</h1>
      <div className="overflow-x-auto bg-white rounded-2xl p-6 ">
        {reminders.map((reminder) => (
          <div key={reminder.id} className="mb-4">
            <Table>
              <TableCaption>A list of your reminders.</TableCaption>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Title</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Time</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Keywords</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {reminders.map((reminder) => (
                  <TableRow key={reminder.id}>
                    <TableCell>{reminder.title}</TableCell>
                    <TableCell>{reminder.description}</TableCell>
                    <TableCell>{reminder.date}</TableCell>
                    <TableCell>{reminder.time}</TableCell>
                    <TableCell>{reminder.priority}</TableCell>
                    <TableCell>{reminder.keywords.join(", ")}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReminderTable;
