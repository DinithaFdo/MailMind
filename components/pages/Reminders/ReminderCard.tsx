"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FaCircle } from "react-icons/fa";
import { PiArrowBendRightUpBold } from "react-icons/pi";
import { IoCheckmarkDoneOutline } from "react-icons/io5";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from "sonner";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import EditReminderDialog from "./EditReminderDialog";

type Priority = "High" | "Medium" | "Low";

interface ReminderCardProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  priority: Priority;
  keywords: string[];
  onDeleteSuccess?: () => void;
}

const BadgeComponent: React.FC<{ status: boolean }> = ({ status }) => (
  <Badge
    variant="outline"
    className={`border ${
      status
        ? "bg-indigo-100 border-indigo-300 text-indigo-500"
        : "border-yellow-300 bg-yellow-100 text-yellow-500"
    }`}>
    <FaCircle className="mr-1 text-xs" />
    {status ? "Completed" : "Not Completed"}
  </Badge>
);

const ReminderCard: React.FC<ReminderCardProps> = ({
  id,
  title,
  description,
  date,
  time,
  priority,
  keywords,
  onDeleteSuccess,
}) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showEdit, setShowEdit] = useState(false);

  const handleCompletionToggle = async () => {
    try {
      const res = await fetch(`/api/reminders/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isCompleted: !isCompleted }),
      });

      if (res.ok) {
        setIsCompleted(!isCompleted);
        toast.success("Reminder updated.");
      } else {
        toast.error("Update failed.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong.");
    }
  };

  const handleDeleteConfirmed = async () => {
    try {
      const res = await fetch(`/api/reminders/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        toast.success("Reminder deleted!");
        onDeleteSuccess?.();
        setShowDialog(false);
      } else {
        toast.error("Failed to delete reminder.");
      }
    } catch (error) {
      console.error("Error deleting reminder:", error);
      toast.error("Something went wrong.");
    }
  };

  return (
    <>
      <div className="bg-white rounded-2xl p-4 border shadow-sm">
        <div className="flex items-start justify-between">
          <BadgeComponent status={isCompleted} />
          <div className="flex flex-col items-end text-xs text-gray-500">
            <p>{date}</p>
            <p>{time}</p>
          </div>
        </div>

        <div className="mt-2">
          <p className="text-lg font-medium">{title}</p>
          <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
        </div>

        <div className="mt-2">
          <span
            className={`py-1 px-2 rounded-full text-xs ${
              priority === "High"
                ? "bg-green-100 text-green-800 border border-green-300"
                : priority === "Medium"
                ? "bg-yellow-100 text-yellow-800 border border-yellow-300"
                : "bg-red-100 text-red-800 border border-red-300"
            }`}>
            {priority} Priority
          </span>
        </div>

        <div className="mt-5 text-sm text-gray-600">
          <span className="font-medium">Keywords:</span> <br />
          {keywords.map((keyword, index) => (
            <span key={index} className="text-indigo-500 mr-1">
              #{keyword}
            </span>
          ))}
        </div>

        <div className="flex gap-2 mt-4 items-center justify-between">
          <Button
            variant="link"
            className="hover:cursor-pointer text-indigo-500 px-0"
            onClick={handleCompletionToggle}>
            {isCompleted ? <PiArrowBendRightUpBold /> : <IoCheckmarkDoneOutline />}
            {isCompleted ? " Undo" : " Mark as Done"}
          </Button>

          <div className="flex items-center gap-2">
            <Button variant="link" onClick={() => setShowEdit(true)}>
              <CiEdit />
            </Button>

            {/* Delete confirmation dialog */}
            <Dialog open={showDialog} onOpenChange={setShowDialog}>
              <DialogTrigger asChild>
                <Button variant="link">
                  <MdOutlineDeleteOutline />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Are you sure?</DialogTitle>
                </DialogHeader>
                <p className="text-sm text-gray-600">
                  Do you really want to delete this reminder? This action cannot be undone.
                </p>
                <DialogFooter className="mt-4 flex justify-end gap-2">
                  <Button variant="ghost" onClick={() => setShowDialog(false)}>
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleDeleteConfirmed}>
                    Yes, Delete
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>

      {/* Edit Dialog */}
      <EditReminderDialog
        open={showEdit}
        onClose={() => setShowEdit(false)}
        reminder={{
          _id: id,
          title,
          description,
          date,
          time,
          priority,
          keywords,
        }}
        onSuccess={onDeleteSuccess || (() => {})}
      />
    </>
  );
};

export default ReminderCard;
