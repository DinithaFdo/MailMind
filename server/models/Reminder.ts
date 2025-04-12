import mongoose from "mongoose";

const ReminderSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    date: String, // YYYY-MM-DD
    time: String, // HH:MM
    priority: {
      type: String,
      enum: ["High", "Medium", "Low"],
      default: "Medium",
    },
    keywords: [String],
    isCompleted: {
      type: Boolean,
      default: false,
    },
    clerkUserId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.models.Reminder ||
  mongoose.model("Reminder", ReminderSchema);
