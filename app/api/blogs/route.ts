import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Blog from "@/server/models/Blog";

export async function GET() {
  try {
    await connectDB();
    const blogs = await Blog.find({});
    return NextResponse.json(blogs, { status: 200 });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return NextResponse.json(
      { error: "Failed to fetch blogs" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const { imageUrl, title, date, readTime, category } = await req.json();
    const newBlog = new Blog({ imageUrl, title, date, readTime, category });
    await newBlog.save();
    return NextResponse.json(newBlog, { status: 201 });
  } catch (error) {
    console.error("Error creating blog:", error); // ✅ Logs the error
    return NextResponse.json(
      { error: "Failed to create blog" },
      { status: 500 }
    );
  }
}
