import mongoose, { Schema, Document } from "mongoose";

export interface IBlog extends Document {
  imageUrl: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
}

const BlogSchema = new Schema<IBlog>({
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  date: { type: String, required: true },
  readTime: { type: String, required: true },
  category: { type: String, required: true },
});

export default mongoose.models.Blog ||
  mongoose.model<IBlog>("Blog", BlogSchema);
