// src/app/api/categories/route.ts
import { NextResponse } from "next/server";

import Category from "@/server/models/Category";
import connectDB from "@/lib/db";

export async function GET() {
  await connectDB();
  const categories = await Category.find();
  return NextResponse.json(categories);
}

/*************  ✨ Codeium Command ⭐  *************/
/**
 * Handles the creation of a new category.
 *
 * Connects to the database, parses the request body to extract the category label,
 * and creates a new category document in the database.
 *
 * @param req - The incoming request object containing the category label in JSON format.
 * @returns A JSON response with the newly created category and a status code of 201,
 *          or an error message with a status code of 400 if the label is missing.
 */

/******  259a1908-21ce-47eb-a698-4d7aa16b6556  *******/ export async function POST(
  req: Request
) {
  await connectDB();
  const { label } = await req.json();
  if (!label)
    return NextResponse.json({ error: "Label is required" }, { status: 400 });

  const newCategory = await Category.create({ label });
  return NextResponse.json(newCategory, { status: 201 });
}

export async function DELETE(req: Request) {
  await connectDB();
  const { id } = await req.json();
  await Category.findByIdAndDelete(id);
  return NextResponse.json({ message: "Category deleted" });
}
