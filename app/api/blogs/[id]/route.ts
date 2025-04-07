import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Blog from "@/server/models/Blog";

// GET - Fetch a single blog post by ID
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Connect to database
    await connectDB();

    // Find the blog by ID
    const blog = await Blog.findById(params.id);

    // If blog not found, return 404
    if (!blog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Return the blog data
    return NextResponse.json(blog, { status: 200 });
  } catch (error) {
    // Log error and return 500
    console.error("Error fetching blog:", error);
    return NextResponse.json({ error: "Error fetching blog" }, { status: 500 });
  }
}

// PUT - Update a blog post by ID
export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Connect to database
    await connectDB();

    // Get the data sent with the PUT request
    const data = await req.json();

    // Validate data (you can extend this based on your blog model)
    if (!data.title || !data.content) {
      return NextResponse.json(
        { error: "Missing required fields (title, content)" },
        { status: 400 }
      );
    }

    // Find and update the blog by ID
    const updatedBlog = await Blog.findByIdAndUpdate(params.id, data, {
      new: true, // Return the updated document
    });

    // If no blog found, return 404
    if (!updatedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Return the updated blog
    return NextResponse.json(updatedBlog, { status: 200 });
  } catch (error) {
    // Log error and return 500
    console.error("Error updating blog:", error);
    return NextResponse.json({ error: "Error updating blog" }, { status: 500 });
  }
}

// DELETE - Delete a blog post by ID
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Connect to database
    await connectDB();

    // Delete the blog by ID
    const deletedBlog = await Blog.findByIdAndDelete(params.id);

    // If no blog found, return 404
    if (!deletedBlog) {
      return NextResponse.json({ error: "Blog not found" }, { status: 404 });
    }

    // Return success message
    return NextResponse.json(
      { message: "Blog deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    // Log error and return 500
    console.error("Error deleting blog:", error);
    return NextResponse.json({ error: "Error deleting blog" }, { status: 500 });
  }
}
