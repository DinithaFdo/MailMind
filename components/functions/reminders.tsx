import { useState, FormEvent, ChangeEvent } from "react";

const Reminder = () => {
  const [reminders, setReminders] = useState<string[]>([]);
  const [newReminder, setNewReminder] = useState<string>("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newReminder.trim() !== "") {
      setReminders([...reminders, newReminder]);
      setNewReminder("");
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewReminder(e.target.value);
  };

  return (
    <div>
      <h1>ALL Reminder List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newReminder}
          onChange={handleChange}
          placeholder="Add a new reminder"
        />
        <button type="submit">Add</button>
      </form>
      <ul>
        {reminders.map((reminder, index) => (
          <li key={index}>{reminder}</li>
        ))}
      </ul>
    </div>
  );
};

export default Reminder;
