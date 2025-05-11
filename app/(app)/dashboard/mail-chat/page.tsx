import ChatComponent from "@/components/shared/dashboard/mail/ChatComponent";
import MailHeader from "@/components/shared/dashboard/mail/MailHeader";
import SummarizePage from "@/components/shared/dashboard/mail/SummarizePage"; // Import the SummarizePage
import { Separator } from "@/components/ui/separator";
import React from "react";

export default function Page() {
  return (
    <div>
      <MailHeader />

      <Separator />
      <div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-2 p-6 border-r">
            <ChatComponent />
          </div>
          <div>
            {/* Render the SummarizePage component instead */}
            <SummarizePage />
          </div>
        </div>
      </div>
    </div>
  );
}
