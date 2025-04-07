"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { FaCircle } from "react-icons/fa";
import { PiArrowBendRightUpBold } from "react-icons/pi";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";

// Define priority type
type Priority = "High" | "Medium" | "Low";

// Badge Component
const BadgeComponent: React.FC<{ status: boolean }> = ({ status }) => (
  <Badge
    variant="outline"
    className={`border ${
      status
        ? "bg-indigo-100 border-indigo-300 text-indigo-500"
        : "border-yellow-300 bg-yellow-100 text-yellow-500"
    }`}>
    <FaCircle className={status ? "text-indigo-500" : "text-yellow-500"} />
    {status ? "Completed" : "Not Completed"}
  </Badge>
);

// Reminder Card Component
interface ReminderCardProps {
  title: string;
  description: string;
  date: string;
  time: string;
  priority: Priority;
  keywords: string[];
}

const ReminderCard: React.FC<ReminderCardProps> = ({
  title,
  description,
  date,
  time,
  priority,
  keywords,
}) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);

  // Toggle completion status
  const handleCompletionToggle = () => {
    setIsCompleted(!isCompleted);
  };

  return (
    <div className="bg-white rounded-2xl p-4 border">
      <div className="flex items-start justify-between">
        <BadgeComponent status={isCompleted} />
        <div className="flex flex-col items-end">
          <p className="text-xs text-gray-500">{date}</p>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>

      <div className="mt-2">
        <p className="text-lg font-medium">{title}</p>
        <p className="text-sm text-gray-500 line-clamp-3">{description}</p>
      </div>

      {/* Priority Indicator */}
      <div className="mt-2">
        <span
          className={`badge ${
            priority === "High"
              ? "bg-green-100 text-green-800 border-green-300 border"
              : priority === "Medium"
              ? "bg-yellow-300 text-yellow-800"
              : "bg-red-300 text-red-800"
          } py-1 px-2 rounded-full text-xs`}>
          {priority} Priority
        </span>
      </div>

      {/* Keywords */}
      <div className="mt-2 text-sm text-gray-600">
        <span className="font-medium">Keywords:</span> <br />
        {keywords.map((keyword, index) => (
          <span key={index} className="text-indigo-500 mr-1">
            {keyword}
          </span>
        ))}
      </div>

      <div className="flex gap-2 mt-4 items-center justify-between">
        {/* Completion Checkbox */}
        {isCompleted ? (
          <Button variant="link" onClick={handleCompletionToggle}>
            <PiArrowBendRightUpBold /> Undo
          </Button>
        ) : (
          <Button
            variant="link"
            className="hover:cursor-pointer text-indigo-500 px-0"
            onClick={handleCompletionToggle}>
            <IoCheckmarkDoneOutline /> Mark as Done
          </Button>
        )}

        {/* Edit and Delete */}
        <div className="flex items-center gap-2">
          <Button variant="link">
            <CiEdit />
          </Button>
          <Button variant="link">
            <MdOutlineDeleteOutline />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ReminderCard;
