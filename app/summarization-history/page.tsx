"use client";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function Summaries() {
  const [summaries, setSummaries] = useState<any[]>([]);
  const [selectedSummary, setSelectedSummary] = useState<any>(null);
  const [updatedSummary, setUpdatedSummary] = useState("");
  const [updatedName, setUpdatedName] = useState("");
  const [updatedTags, setUpdatedTags] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [deleteSummaryId, setDeleteSummaryId] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState("");
  const [openModifyModal, setOpenModifyModal] = useState(false);
  const [deleting, setDeleting] = useState(false); // Track if deletion is in progress

  // ✅ Fetch Summaries with loading state
  useEffect(() => {
    const fetchSummaries = async () => {
      setLoading(true); // Show loader before fetching
      try {
        const response = await fetch("/api/summarizations");
        const data = await response.json();
        if (!response.ok)
          throw new Error(data.error || "Failed to fetch summaries");
        setSummaries(data.summaries);
      } catch (error) {
        console.error("Error fetching summaries:", error);
        toast.error("Error fetching summaries");
      } finally {
        setLoading(false); // Hide loader after fetching
      }
    };
    fetchSummaries();
  }, []);

  // ✅ Handle Delete Summary
  const handleDelete = async (id: string) => {
    setDeleting(true); // Start deletion loading state
    try {
      const response = await fetch(`/api/summarizations/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete summary");

      toast.success("Summary deleted successfully!");
      setSummaries(summaries.filter((summary) => summary._id !== id));
      setOpenDeleteDialog(false);
      setSelectedSummary(null);
    } catch (error) {
      console.error("Error deleting summary:", error);
      toast.error("Error deleting summary");
    } finally {
      setDeleting(false); // End deletion loading state
    }
  };

  // ✅ Handle Edit Summary
  const handleEdit = (summary: any) => {
    setSelectedSummary(summary);
    setUpdatedSummary(summary.summary); // Prefill summary data
    setUpdatedName(summary.name); // Prefill name data
    setUpdatedTags(summary.tags || []); // Prefill tags data (ensure it's an array)
    setOpenModifyModal(true); // Open the Modify modal when edit is clicked
  };

  // ✅ Handle Update Summary
  const handleUpdate = async () => {
    if (!updatedName || updatedName.length > 50) {
      toast.error("Name is required and should be less than 50 characters.");
      return;
    }

    if (!updatedSummary || updatedSummary.length < 10) {
      toast.error("Summary must be at least 10 characters.");
      return;
    }

    // Check if the name is unique
    const nameExists = summaries.some(
      (summary) =>
        summary.name.toLowerCase() === updatedName.toLowerCase() &&
        summary._id !== selectedSummary._id
    );
    if (nameExists) {
      toast.error("Name must be unique.");
      return;
    }

    // Check if the user is adding more than 5 tags
    if (updatedTags.length > 5) {
      toast.error("You can only add up to 5 tags.");
      return;
    }

    try {
      const response = await fetch(
        `/api/summarizations/${selectedSummary._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: updatedName,
            summary: updatedSummary,
            tags: updatedTags,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update summary");

      const updatedData = await response.json();
      setSummaries(
        summaries.map((summary) =>
          summary._id === selectedSummary._id
            ? updatedData.updatedSummary
            : summary
        )
      );

      toast.success("Summary updated successfully!");
      setOpenModifyModal(false); // Close the Modify modal after update
      setSelectedSummary(null); // Clear selected summary after update
    } catch (error) {
      console.error("Error updating summary:", error);
      toast.error("Error updating summary");
    }
  };

  // ✅ Handle Tag Input (Press space to add a tag)
  const handleTagInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const newTags = value.split(" ").filter((tag) => tag.trim() !== "");

    // Check if the user is trying to add more than 5 tags
    if (newTags.length <= 5) {
      setUpdatedTags(newTags);
    } else {
      toast.error("You can only add up to 5 tags.");
    }
  };

  // ✅ Handle adding tags when space is pressed
const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const inputField = e.target as HTMLInputElement;
  const value = inputField.value.trim();

  // If space or enter is pressed
  if (e.key === " " || e.key === "Enter") {
    if (value !== "") {
      // Split the value by space and filter out empty tags
      const newTags = value.split(" ").filter((tag) => tag.trim() !== "");

      // Avoid adding duplicate tags
      const uniqueTags = Array.from(new Set([...updatedTags, ...newTags]));

      // Update tags state with unique tags
      setUpdatedTags(uniqueTags);
      

      // Clear the input after adding the tag
      inputField.value = "";
    }
  }
};





  // ✅ Filter Summaries by Search Term
  const filteredSummaries = summaries.filter(
    (summary) =>
      summary.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      summary.summary.toLowerCase().includes(searchTerm.toLowerCase()) ||
      summary.tags.some((tag: string) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Show loading message or loader when fetching data
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500"></div>
      </div>
    );
  }

  const handleDownloadReport = () => {
  const doc = new jsPDF();
  const currentDate = new Date().toLocaleString();

  const logoUrl = "/MailMind Logo.png"; // Make sure this image exists in the public folder
  const img = new Image();
  img.src = logoUrl;

  img.onload = () => {
    // 🖼️ Logo (top right)
    doc.addImage(img, "PNG", 150, 10, 40, 12);

    // 📝 Title
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text("MailMind – Summary Report", 14, 20);

    // 📅 Timestamp
    doc.setFontSize(10);
    doc.setTextColor(100);
    doc.text(`Generated on: ${currentDate}`, 14, 27);

    // 📊 Table content
    const tableColumn = ["Name", "Summary"];
    const tableRows = filteredSummaries.map((summary) => [
      summary.name,
      summary.summary.length > 100
        ? summary.summary.slice(0, 100) + "..."
        : summary.summary,
    ]);

    autoTable(doc, {
      startY: 32,
      head: [tableColumn],
      body: tableRows,
      theme: "grid",
      headStyles: {
        fillColor: [63, 81, 181],
        textColor: 255,
        fontSize: 11,
      },
      bodyStyles: {
        fontSize: 10,
        cellPadding: 3,
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      styles: {
        halign: "left",
        valign: "middle",
      },
    });

    // Save the PDF
    doc.save("summary-report.pdf");
  };
};



  return (
    <div className="flex">
      {/* Left Sidebar: List of Summaries */}
      <div className="w-1/3 p-6 overflow-y-auto h-screen bg-gray-50">
        {/* Return to Dashboard */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center justify-between mb-6">
  <h2 className="text-2xl font-bold text-gray-700">Summaries</h2>
  
</div>

          <Link
            href="/dashboard/mail-chat"
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 hover:text-gray-800 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Dashboard
          </Link>
        </div>

        {/* Search Bar */}
        <Input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search by name, content, or tags"
          className="w-full p-4 mb-6 border rounded-xl shadow-md focus:outline-none"
        />

        {filteredSummaries.length === 0 ? (
          <p>No summaries found.</p>
        ) : (
          <ul className="space-y-6">
            {filteredSummaries.map((summary) => (
              <li
                key={summary._id}
                className="p-4 border rounded-lg shadow-md cursor-pointer hover:bg-gray-100 transition-all"
                onClick={() => setSelectedSummary(summary)} // Update selected summary on click
              >
                <h3 className="text-lg font-semibold text-gray-800">
                  {summary.name}
                </h3>
                <p className="text-gray-600">
                  {summary.summary.slice(0, 50)}...
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right Sidebar: Selected Summary Details */}
      <div className="flex-1 p-6 bg-white shadow-lg rounded-l-lg">
        {selectedSummary ? (
          <div className="flex flex-col items-start space-y-6">
            {/* Title */}
            <h2 className="text-3xl font-semibold text-gray-900">
              {selectedSummary.name}
            </h2>

            {/* Meta Info */}
            <p className="text-sm text-gray-500 mb-6 border-b pb-2">
              Created on: {new Date(selectedSummary.createdAt).toLocaleString()}
            </p>

            {/* Body Content (email-style formatting with no hardcoded text) */}
            <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed whitespace-pre-wrap">
              {selectedSummary.summary}
            </div>

            {/* Copy Button */}
            <div className="flex justify-end mb-4">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(selectedSummary.summary);
                  toast.success("Copied to clipboard!");
                }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gray-100 text-sm text-gray-700 border border-gray-300 rounded-md hover:bg-gray-200 transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={1.5}
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8 16h8m-8-4h8m-8-4h8m-4 12a9 9 0 100-18 9 9 0 000 18z"
                  />
                </svg>
                Copy Summary
              </button>
            </div>

            {/* Tags Section */}
            <div className="mt-8 border-t pt-4">
              <p className="text-sm font-semibold text-gray-700 mb-2">Tags:</p>
              <div className="flex flex-wrap gap-2">
                {selectedSummary.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-6 flex gap-6">
              <Button
                onClick={() => handleEdit(selectedSummary)} // Open Modify modal when clicked
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md focus:outline-none"
              >
                Modify
              </Button>
              <AlertDialog
                open={openDeleteDialog}
                onOpenChange={setOpenDeleteDialog}
              >
                <AlertDialogTrigger asChild>
                  <Button
                    onClick={() => {
                      setDeleteSummaryId(selectedSummary._id);
                      setOpenDeleteDialog(true);
                    }}
                    className="bg-red-500 hover:bg-red-600 text-white py-3 px-6 rounded-lg shadow-md focus:outline-none"
                  >
                    Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent className="absolute right-10 top-1/3">
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. Do you want to delete this
                      summary?
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel
                      onClick={() => setOpenDeleteDialog(false)}
                    >
                      Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(deleteSummaryId)}
                    >
                      {deleting ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-t-4 border-white"></div>
                      ) : (
                        "Delete"
                      )}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </div>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-semibold text-gray-700 mt-10">
              Select a summary to view details
            </h2>
            <Button
    onClick={handleDownloadReport}
    className="bg-indigo-600 text-white text-sm px-4 py-1.5 rounded-full shadow hover:bg-indigo-700 transition mt-10"
  >
    Download Summarization History
  </Button>
          </div>
        )}
      </div>

      {/* Modify Summary Modal */}
      <Dialog open={openModifyModal} onOpenChange={setOpenModifyModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Modify Summary</DialogTitle>
            <DialogDescription>
              Edit the details of your saved summary.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Input
              type="text"
              value={updatedName}
              onChange={(e) => setUpdatedName(e.target.value)}
              placeholder="Summary Name"
              className="mb-4"
            />
            <Textarea
              value={updatedSummary}
              onChange={(e) => setUpdatedSummary(e.target.value)}
              placeholder="Summary Content"
              className="mb-4"
            />
            <div className="mb-4">
              <Input
                type="text"
                value={updatedTags.join(" ")} // Display the tags as a string
                onChange={handleTagInput} // Update tags as user types
                onKeyUp={handleKeyUp} // Update tags on space key
                placeholder="Add tags (space separated)"
                className="mb-4"
              />
              <div className="flex flex-wrap gap-2">
                {updatedTags.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-blue-200 text-blue-800 py-1 px-3 rounded-full text-sm font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button onClick={handleUpdate} className="bg-blue-500 text-white">
                Save Changes
              </Button>
              <Button
                onClick={() => setOpenModifyModal(false)}
                className="ml-2"
              >
                Cancel
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
