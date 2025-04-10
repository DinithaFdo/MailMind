import mongoose from "mongoose";

const UserDetailsSchema = new mongoose.Schema({
  clerkUserId: { type: String, required: true, unique: true },
  name: String,
  occupation: String,
  allowBrowserAlerts: Boolean,
  allowWhatsappAlerts: Boolean,
  whatsappNumber: String,
  allowTextAlerts: Boolean,
  phoneNumber: String,
}, { timestamps: true });

export default mongoose.models.UserDetails ||
  mongoose.model("UserDetails", UserDetailsSchema);
