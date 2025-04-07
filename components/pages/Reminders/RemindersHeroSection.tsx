import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function RemindersHeroSection() {
  return (
    <div className=" p-10">
      <h1 className=" text-4xl font-medium">Welcome Back to Reminders 👋</h1>
      <p className=" text-lg font-medium text-gray-400 max-w-xl mt-3 ">
        Get timely reminders for important deadlines and upcoming events. Stay
        organized and never miss a thing.
      </p>
      <div className=" mt-4">
        <Link href={"/dashboard/reminders/create-reminder"}>
          <Button>Add Reminder</Button>
        </Link>
      </div>
    </div>
  );
}
