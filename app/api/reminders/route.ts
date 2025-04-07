import { NextResponse } from "next/server";
import { createReminder, getReminders } from "@/server/models/Reminder";

export async function GET() {
  try {
    const reminders = getReminders();
    return NextResponse.json(reminders);
  } catch (error) {
    console.error("Error fetching reminders:", error);
    return NextResponse.json(
      { message: "Error fetching reminders" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate required fields
    if (!body.title || !body.description || !body.date || !body.time) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Validate date format (simple check)
    if (!/^\d{4}-\d{2}-\d{2}$/.test(body.date)) {
      return NextResponse.json(
        { message: "Invalid date format. Use YYYY-MM-DD" },
        { status: 400 }
      );
    }

    // Validate time format (simple check)
    if (!/^\d{2}:\d{2}$/.test(body.time)) {
      return NextResponse.json(
        { message: "Invalid time format. Use HH:MM" },
        { status: 400 }
      );
    }

    // Create the reminder
    const newReminder = createReminder({
      title: body.title,
      description: body.description,
      date: body.date,
      time: body.time,
      priority: body.priority || "Medium",
      keywords: body.keywords || [],
    });

    return NextResponse.json(newReminder, { status: 201 });
  } catch (error) {
    console.error("Error creating reminder:", error);
    return NextResponse.json(
      { message: "Error creating reminder" },
      { status: 500 }
    );
  }
}
