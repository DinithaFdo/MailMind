import { NextResponse } from "next/server";

// Dummy database (Replace this with actual DB integration)
const summaries = [
  {
    id: "1",
    date: "23 May 2023",
    time: "11.00PM",
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    keywords: ["Keyword 1", "Keyword 2", "Keyword 3"],
  },
];

// GET all summaries
export async function GET() {
  return NextResponse.json(summaries);
}

// POST new summary
export async function POST(req: Request) {
  const newSummary = await req.json();
  newSummary.id = (summaries.length + 1).toString(); // Generate a new ID
  summaries.push(newSummary);
  return NextResponse.json(newSummary, { status: 201 });
}
