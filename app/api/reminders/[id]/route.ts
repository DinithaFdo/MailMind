import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Reminder from "@/server/models/Reminder";

// ✅ Use context.params properly
export async function PUT(req: Request, context: { params: { id: string } }) {
  try {
    await connectDB();
    const body = await req.json();
    const id = context.params.id; // 👈 fix here

    const updated = await Reminder.findByIdAndUpdate(id, body, { new: true });

    return updated
      ? NextResponse.json(updated)
      : NextResponse.json({ message: "Not found" }, { status: 404 });
  } catch (err) {
    console.error("❌ Update failed:", err);
    return NextResponse.json({ message: "Update error" }, { status: 500 });
  }
}


export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

     // ✅ Print the incoming ID to the server console
     console.log("🧨 Deleting reminder:", id);

    if (!id) {
      return NextResponse.json({ message: "Missing ID" }, { status: 400 });
    }

    await connectDB();
    const deleted = await Reminder.findByIdAndDelete(id);

    return deleted
      ? NextResponse.json({ message: "Deleted successfully" })
      : NextResponse.json({ message: "Reminder not found" }, { status: 404 });
  } catch (err) {
    console.error("Delete failed:", err);
    return NextResponse.json({ message: "Error deleting reminder" }, { status: 500 });
  }
}


