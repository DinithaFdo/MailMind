import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import Reminder from "@/server/models/Reminder";

// ✅ Create new reminder
export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth(); // 👈 Secure Clerk User ID
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { title, description, date, time, priority, keywords } = body;

    if (!title || !date || !time) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    await connectDB();

    const newReminder = await Reminder.create({
      title,
      description,
      date,
      time,
      priority,
      keywords,
      isCompleted: false,
      clerkUserId: userId,
    });

    return NextResponse.json(newReminder, { status: 201 });
  } catch (err) {
    console.error("❌ Reminder creation failed:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};

// ✅ Fetch reminders only for logged-in user
export const GET = async (req: NextRequest) => {
  try {
    const { userId } = await auth(); // 👈 Clerk ID from session
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const reminders = await Reminder.find({ clerkUserId: userId }).sort({ createdAt: -1 });

    return NextResponse.json(reminders);
  } catch (err) {
    console.error("❌ Fetch error:", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
};
