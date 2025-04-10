// app/api/user-details/[id]/route.ts
import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import UserDetails from "@/server/models/UserDetails";

export async function GET(_: Request, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    const existing = await UserDetails.findOne({ clerkUserId: params.id });

    if (!existing) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(existing, { status: 200 });
  } catch (error) {
    console.error("Error fetching user details:", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
