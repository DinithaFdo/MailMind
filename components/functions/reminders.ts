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
      
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={newReminder}
          onChange={(e) => setNewReminder(e.target.value)}
          placeholder="Add a new reminder"
        />
        <input
  type="text"
  value={newReminder}
  onChange={(e) => setNewReminder(e.target.value)}
  placeholder="Add new reminder"
/>
<div className="reminder-container">


        <button type="submit">Add</button>
      </form>
      
    </div>
  );
};

export default Reminder;
