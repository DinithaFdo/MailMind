import AddAccountSidebar from "@/components/shared/dashboard/reusable/AddAccountSidebar";
import InboxSideBar from "@/components/shared/dashboard/reusable/InboxSideBar";
import { ProfilePicture } from "@/components/shared/dashboard/reusable/ProfilePicture";
import { HiOutlineDocumentText } from "react-icons/hi";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { Metadata } from "next";
import Link from "next/link";

import { FaRegClock } from "react-icons/fa6";
import { IoMdNotificationsOutline } from "react-icons/io";

export const metadata: Metadata = {
  title: "MailMind – AI-Powered Email Management for Smarter Productivity",
  description:
    "MailMind is an AI-driven email assistant that helps you categorize, prioritize, and summarize emails effortlessly. Automate replies, detect urgent messages, and stay on top of your inbox with ease. Experience smarter email management today!",
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className=" sticky top-0 z-50 flex items-start">
      <div className=" sticky top-0 w-16 bg-gray-100 border-r h-screen">
        <AddAccountSidebar />
      </div>
      <div className=" w-full">
        <div className=" grid grid-cols-1 md:grid-cols-5">
          <div>
            <InboxSideBar />
          </div>
          <div className=" col-span-4">
            <div className=" bg-white py-3 px-4 sticky top-0 z-50 border-b">
              <div className=" justify-end flex gap-3">
                {/*<TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link
                        href={"/dashboard/reminders"}
                        className=" w-8 h-8 flex items-center justify-center border bg-gray-50 rounded-full p-0.5">
                        <HiOutlineDocumentText />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Summaries</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>*/}
                <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link
                      href={"/summarization-history"}
                      className=" w-8 h-8 flex items-center justify-center border bg-gray-50 rounded-full p-0.5">
                      <HiOutlineDocumentText />
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Summaries</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger>
                      <Link
                        href={"/dashboard/reminders"}
                        className=" w-8 h-8 flex items-center justify-center border bg-gray-50 rounded-full p-1">
                        <FaRegClock />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>
                      <Link href={"/dashboard/reminders"}>
                        <p>Reminders</p>
                      </Link>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <ProfilePicture />
              </div>
            </div>
            <div>{children}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
