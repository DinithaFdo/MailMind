import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { emailBody } = await req.json();

    if (!emailBody) {
      return NextResponse.json(
        { error: "Email body is required" },
        { status: 400 },
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    // UPDATED PROMPT: More robust instructions for a natural email flow
    const prompt = `You are an expert communication assistant. Rewrite the following email draft to be concise, clear, and professional. 
    
    Rules:
    1. Keep all critical information (dates, names, action items).
    2. Remove fluff and redundancy.
    3. The output must be ready-to-send text (no intro like "Here is a summary").
    4. Do not use bullet points; use fluid paragraphs.
    5. Maintain the original sender's voice but make it more polished.

    Original Email:
    ${emailBody}`;

    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash", // UPDATED: Changed to the available 2.5 Flash model
      config: {
        responseMimeType: "text/plain",
      },
      contents: [
        {
          role: "user",
          parts: [{ text: prompt }],
        },
      ],
    });

    let summary = "";
    for await (const chunk of response) {
      summary += chunk.text || "";
    }

    return NextResponse.json({ summary });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    console.error("Summarization error:", errorMessage);
    return NextResponse.json(
      { error: "Failed to summarize email. Please try again later." },
      { status: 500 },
    );
  }
}
