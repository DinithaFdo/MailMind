"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { toast } from "sonner";

type Priority = "High" | "Medium" | "Low";

interface EditReminderProps {
  open: boolean;
  onClose: () => void;
  reminder: {
    _id: string;
    title: string;
    description: string;
    date: string;
    time: string;
    priority: Priority;
    keywords: string[];
  };
  onSuccess: () => void;
}

export default function EditReminderDialog({
  open,
  onClose,
  reminder,
  onSuccess,
}: EditReminderProps) {
  const [formData, setFormData] = useState(reminder);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/reminders/${reminder._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        toast.success("Reminder updated!");
        onSuccess();
        onClose();
      } else {
        toast.error("Failed to update reminder.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Reminder</DialogTitle>
        </DialogHeader>

        <div className="grid gap-3">
        <div className="grid gap-3">
  <Input
    name="title"
    value={formData.title}
    onChange={handleChange}
    placeholder="Title"
  />

  <Textarea
    name="description"
    value={formData.description}
    onChange={handleChange}
    placeholder="Description"
  />

  <Input
    name="date"
    type="date"
    value={formData.date}
    onChange={handleChange}
  />

  <Input
    name="time"
    type="time"
    value={formData.time}
    onChange={handleChange}
  />

  {/* 🔽 Priority Dropdown */}
  <div>
    <label htmlFor="priority" className="text-sm font-medium text-gray-600 mb-1 block">
      Priority
    </label>
    <select
      id="priority"
      name="priority"
      value={formData.priority}
      onChange={handleChange}
      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
    >
      <option value="High">High</option>
      <option value="Medium">Medium</option>
      <option value="Low">Low</option>
    </select>
  </div>

  <Input
    name="keywords"
    value={formData.keywords.join(", ")}
    onChange={(e) =>
      setFormData((prev) => ({
        ...prev,
        keywords: e.target.value.split(",").map((k) => k.trim()),
      }))
    }
    placeholder="Comma separated keywords"
  />
</div>

        </div>

        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit} disabled={loading}>
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}