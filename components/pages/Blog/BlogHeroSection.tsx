import { Button } from "@/components/ui/button";
import Link from "next/link";

import React from "react";

export default function BlogHeroSection() {
  return (
    <div>
      <div className=" max-w-7xl mx-auto py-10 md:py-20">
        <div className=" flex flex-col gap-y-4 items-start">
          <p className=" px-2 py-1 text-xs border rounded-full inline-flex items-start">
            Boost Your Productivity with AI-Powered Email Insights
          </p>
          <h1 className=" text-5xl font-medium">Welcome to MailMind Blog 👋</h1>
          <p className=" text-xl max-w-2xl">
            MailMind helps you organize, prioritize, and respond to emails
            smarter and faster—so you can focus on what truly matters.
          </p>
          <div>
            <Link href="/blog/create-new-blog">
              <Button variant={"default"} className=" ">
                Create New Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
