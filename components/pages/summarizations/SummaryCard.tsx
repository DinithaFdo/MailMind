import { Button } from "@/components/ui/button";
import React from "react";
import { FaRegCopy } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";

type SummaryCardProps = {
  date: string;
  time: string;
  summary: string;
  keywords: string[];
  onCopy?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
};

export default function SummaryCard({
  date,
  time,
  summary,
  keywords,
  onCopy,
  onEdit,
  onDelete,
}: SummaryCardProps) {
  return (
    <div>
      <div className="bg-white p-4 rounded-lg border">
        <div className="flex items-center justify-between pb-3">
          <p className="text-gray-500 font-medium text-xs">{date}</p>
          <p className="text-gray-500 font-medium text-xs">{time}</p>
        </div>
        <p className="font-medium">{summary}</p>
        <div className="flex items-center justify-between pt-4">
          <div className="flex gap-3 items-center pt-4">
            {keywords.map((keyword, index) => (
              <p
                key={index}
                className="px-3 py-1 bg-indigo-100 border-indigo-400 rounded-full text-indigo-700 border text-xs">
                {keyword}
              </p>
            ))}
          </div>
          <div className="mt-4 flex gap-x-2 justify-end">
            <Button size="sm" variant="outline" onClick={onCopy}>
              <FaRegCopy />
            </Button>
            <Button size="sm" variant="outline" onClick={onEdit}>
              <CiEdit />
            </Button>
            <Button size="sm" variant="outline" onClick={onDelete}>
              <MdDelete className="text-red-500" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
