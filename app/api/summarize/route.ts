import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { emailBody } = await req.json();

    if (!emailBody) {
      return NextResponse.json(
        { error: "Email body is required" },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
    });

    const prompt = `I'm going to send the below email. Summarize it in a way the recipient can understand better. Write the summary as if it's an email I'm about to send them (like a clear, professional note). Avoid bullet points. Output only the email-style summary. Here's the original email:\n\n${emailBody}`;


    const response = await ai.models.generateContentStream({
      model: "gemini-2.5-flash-preview-04-17",
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
  } catch (error: any) {
    console.error("Summarization error:", error);
    return NextResponse.json(
      { error: "Failed to summarize email. Please try again later." },
      { status: 500 }
    );
  }
}
