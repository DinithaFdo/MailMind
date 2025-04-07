// src/models/Category.ts
import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  label: { type: String, required: true, unique: true },
});

export default mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);
