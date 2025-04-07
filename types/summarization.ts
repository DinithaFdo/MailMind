export interface Summarization {
  _id: string; // MongoDB ID for the summarization
  name: string; // The name of the summarization
  summary: string; // The summary text
  tags: string[]; // Tags associated with the summarization
  userId: string; // User ID associated with the summarization
  createdAt: string; // The date when the summarization was created
}
