import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import connectDB from "@/lib/db";
import Summarization from "@/server/models/Summarization";


export const PATCH = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

    await connectDB();

    const { summary, name, tags } = await req.json(); // Ensure tags are included
    if (!summary || summary.length < 10) {
      return NextResponse.json(
        { error: "Summary must be at least 10 characters." },
        { status: 400 }
      );
    }

    // Check if tags are an array and contain valid entries
    const validatedTags = Array.isArray(tags)
      ? tags.filter((tag) => tag.trim() !== "")
      : [];

    // Ensure we only save a maximum of 5 tags
    const finalTags = validatedTags.slice(0, 5);

    const updatedSummary = await Summarization.findOneAndUpdate(
      { _id: params.id, userId }, // Ensures user can only update their own summary
      { summary, name, tags: finalTags }, // Save tags here
      { new: true }
    );

    if (!updatedSummary) {
      return NextResponse.json({ error: "Summary not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Summary updated successfully", updatedSummary },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating summary:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};


export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  try {
    const { userId } = await auth();
    if (!userId)
      return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

    await connectDB();

    const deletedSummary = await Summarization.findOneAndDelete({
      _id: params.id,
      userId,
    });

    if (!deletedSummary) {
      return NextResponse.json({ error: "Summary not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "Summary deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting summary:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
};
