import { NextResponse } from "next/server";

// Dummy database
let summaries = [
  {
    id: "1",
    date: "23 May 2023",
    time: "11.00PM",
    summary: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
    keywords: ["Keyword 1", "Keyword 2", "Keyword 3"],
  },
];

// GET single summary
export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const summary = summaries.find((s) => s.id === params.id);
  if (!summary)
    return NextResponse.json({ error: "Not found" }, { status: 404 });

  return NextResponse.json(summary);
}

// PATCH update summary
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  const updatedData = await req.json();
  summaries = summaries.map((s) =>
    s.id === params.id ? { ...s, ...updatedData } : s
  );

  return NextResponse.json(summaries.find((s) => s.id === params.id));
}

// DELETE summary
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  summaries = summaries.filter((s) => s.id !== params.id);
  return NextResponse.json(
    { message: "Deleted successfully" },
    { status: 200 }
  );
}
