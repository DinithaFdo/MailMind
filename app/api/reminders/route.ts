import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Reminder from "@/server/models/Reminder"; 


export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectDB(); // ✅ Connect to MongoDB

    const reminder = await Reminder.create({
      ...body,
      isCompleted: false, // ✅ Ensure status is always 'Not Completed' at creation
    });

    console.log("Reminder saved to Mongo:", reminder); // 🔍 Debug log

    return NextResponse.json(reminder, { status: 201 });
  } catch (error) {
    console.error("Create error", error);
    return NextResponse.json(
      { message: "Error creating reminder" },
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    await connectDB(); // ✅ Connect
    const reminders = await Reminder.find();
    return NextResponse.json(reminders);
  } catch (error) {
    console.error("Get error", error);
    return NextResponse.json({ message: "Error fetching reminders" }, { status: 500 });
  }
}
