// import TaskList from "@/components/shared/dashboard/reminders/TaskList";
import RemindersHeroSection from "@/components/pages/Reminders/RemindersHeroSection";
import RemindersSection from "@/components/pages/Reminders/RemindersSection";
import React from "react";

export default function page() {
  return (
    <div className=" bg-gray-50 min-h-screen">
      <RemindersHeroSection />
      {/* <TaskList /> */}
      <RemindersSection />
    </div>
  );
}
