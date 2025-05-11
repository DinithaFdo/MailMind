import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import Summarization from "@/server/models/Summarization";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

    const { summary, name } = await req.json();
    if (!summary || summary.length < 10) {
      return NextResponse.json(
        { error: "Summary must be at least 10 characters." },
        { status: 400 }
      );
    }

    await connectDB();

    const newSummarization = new Summarization({
      userId,
      summary,
      name: name || `Summarization - ${new Date().toLocaleString()}`,
      tags: [],
    });

    await newSummarization.save();

    return NextResponse.json(
      {
        message: "Summarization saved successfully",
        summarization: newSummarization,
      },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error saving summarization:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

    await connectDB();

    const summaries = await Summarization.find({ userId }).sort({
      createdAt: -1,
    });

    return NextResponse.json({ summaries }, { status: 200 });
  } catch (error) {
    console.error("Error fetching summaries:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
