import Footer from "@/components/shared/Footer";
import NavBar from "@/components/shared/NavBar";
import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
export const metadata: Metadata = {
  title: "MailMind – AI-Powered Email Management for Smarter Productivity",
  description:
    "MailMind is an AI-driven email assistant that helps you categorize, prioritize, and summarize emails effortlessly. Automate replies, detect urgent messages, and stay on top of your inbox with ease. Experience smarter email management today!",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <div>
        <NavBar />
      </div>
      {children}
      <Toaster />

      <div>
        <Footer />
      </div>
    </div>
  );
}
