import mongoose, { Document, Schema } from "mongoose";

interface ISummarization extends Document {
  name: string;
  summary: string;
  tags: string[];
  userId: string;
  createdAt: Date;
}

const summarizationSchema = new Schema<ISummarization>({
  name: { type: String, required: true, unique: true },
  summary: { type: String, required: true },
  tags: { type: [String], default: [] },
  userId: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Summarization =
  mongoose.models.Summarization ||
  mongoose.model<ISummarization>("Summarization", summarizationSchema);

export default Summarization;
