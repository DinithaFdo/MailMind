export type Priority = (typeof priorities)[number];

const priorities = ["High", "Medium", "Low"] as const;
export interface Reminder {
  id: string;
  title: string;
  description: string;
  date: string; // Format: "YYYY-MM-DD"
  time: string; // Format: "HH:MM"
  priority: Priority;
  keywords: string[];
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// In-memory database (replace with real DB in production)
const reminders: Reminder[] = [];

// Helper to generate ID
const generateId = () => Date.now().toString();

// CRUD Operations
export const getReminders = () => reminders;
export const getReminderById = (id: string) =>
  reminders.find((r) => r.id === id);
export const createReminder = (
  reminder: Omit<Reminder, "id" | "createdAt" | "updatedAt" | "isCompleted">
) => {
  const newReminder: Reminder = {
    ...reminder,
    id: generateId(),
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  reminders.push(newReminder);
  return newReminder;
};
export const updateReminder = (id: string, updates: Partial<Reminder>) => {
  const index = reminders.findIndex((r) => r.id === id);
  if (index === -1) return null;

  reminders[index] = {
    ...reminders[index],
    ...updates,
    updatedAt: new Date(),
  };
  return reminders[index];
};
export const deleteReminder = (id: string) => {
  const index = reminders.findIndex((r) => r.id === id);
  if (index === -1) return false;

  reminders.splice(index, 1);
  return true;
};
