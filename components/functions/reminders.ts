import { useState } from 'react';

const Reminder = () => {
  const [reminders, setReminders] = useState([]);
  const [newReminder, setNewReminder] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newReminder.trim() !== '') {
      setReminders([...reminders, newReminder]);
      setNewReminder('');
    }
  };

  return (
    <div>
      <h1>ALL Reminder List</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newReminder}
          onChange={(e) => setNewReminder(e.target.value)}
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
