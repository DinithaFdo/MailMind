// app/api/user-profile/route.ts
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import UserProfile from "@/server/models/UserDetails";

export async function GET(req: NextRequest) {
  const clerkUserId = req.nextUrl.searchParams.get("clerkUserId");
  if (!clerkUserId) {
    return NextResponse.json({ error: "Missing clerkUserId" }, { status: 400 });
  }

  await connectDB();
  const profile = await UserProfile.findOne({ clerkUserId });
  return NextResponse.json(profile || null);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { clerkUserId } = body;

  if (!clerkUserId) {
    return NextResponse.json({ error: "Missing clerkUserId in request body" }, { status: 400 });
  }

  await connectDB();

  const existing = await UserProfile.findOne({ clerkUserId });
  if (existing) {
    await UserProfile.updateOne({ clerkUserId }, body);
    return NextResponse.json({ message: "Updated" });
  }

  const profile = await UserProfile.create(body);
  return NextResponse.json(profile);
}
