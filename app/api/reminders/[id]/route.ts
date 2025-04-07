import { NextResponse } from "next/server";
import {
  getReminderById,
  updateReminder,
  deleteReminder,
} from "@/server/models/Reminder";

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const reminder = getReminderById(params.id);
    if (!reminder) {
      return NextResponse.json(
        { message: "Reminder not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(reminder);
  } catch (error) {
    console.error("Error fetching reminder:", error);
    return NextResponse.json(
      { message: "Error fetching reminder" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const updatedReminder = updateReminder(params.id, body);
    if (!updatedReminder) {
      return NextResponse.json(
        { message: "Reminder not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(updatedReminder);
  } catch (error) {
    console.error("Error updating reminder:", error);
    return NextResponse.json(
      { message: "Error updating reminder" },
      { status: 400 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const success = deleteReminder(params.id);
    if (!success) {
      return NextResponse.json(
        { message: "Reminder not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(
      { message: "Reminder deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting reminder:", error);
    return NextResponse.json(
      { message: "Error deleting reminder" },
      { status: 500 }
    );
  }
}
