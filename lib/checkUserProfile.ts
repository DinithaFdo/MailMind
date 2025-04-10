// lib/checkUserProfile.ts
import connectDB from "./db";
import UserProfile from "@/server/models/UserDetails";

export async function checkUserProfile(clerkId: string) {
  await connectDB();
  const profile = await UserProfile.findOne({ clerkId });
  return profile;
}
