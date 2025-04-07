import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const ModifySummaryModal = ({ open, onClose, onSave, summary }) => {
  if (!summary) {
    return null; // Don't render the modal if summary is null
  }

  const handleSave = (e) => {
    e.preventDefault();
    // Assuming onSave is a function that updates the summary data

    if (!summary.name || !summary.summary) {
      toast.error("Please provide both a name and a summary.");
      return;
    }

    // Call the onSave function to handle the save logic
    onSave(summary);

    toast.success("Summary updated successfully.");
    onClose();
  };

  const handleTagsChange = (e) => {
    summary.tags = e.target.value.split(",").map((tag) => tag.trim());
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-8 rounded-lg bg-white shadow-xl">
        <DialogHeader>
          <DialogTitle>Edit Summary</DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground mb-4">
            Update the details below to modify your summary.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSave} className="space-y-4">
          {/* Name Field */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="name"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              value={summary.name || ""}
              onChange={(e) => (summary.name = e.target.value)}
              className="mt-2 p-2 w-full border rounded-md border-gray-300 focus:ring-2 focus:ring-primary-500"
              placeholder="Enter name"
            />
          </div>

          {/* Summary Field */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="summary"
            >
              Summary
            </label>
            <textarea
              id="summary"
              value={summary.summary || ""}
              onChange={(e) => (summary.summary = e.target.value)}
              className="mt-2 p-2 w-full border rounded-md border-gray-300 focus:ring-2 focus:ring-primary-500"
              placeholder="Enter summary"
              rows={4}
            />
          </div>

          {/* Tags Field */}
          <div>
            <label
              className="block text-sm font-medium text-gray-700"
              htmlFor="tags"
            >
              Tags
            </label>
            <input
              type="text"
              id="tags"
              value={summary.tags?.join(", ") || ""}
              onChange={handleTagsChange}
              className="mt-2 p-2 w-full border rounded-md border-gray-300 focus:ring-2 focus:ring-primary-500"
              placeholder="Enter tags separated by commas"
            />
            <p className="text-xs text-gray-500 mt-2">
              Add tags separated by commas
            </p>
          </div>

          {/* Buttons */}
          <div className="flex justify-between items-center mt-6">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" variant="primary">
              Save Changes
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default ModifySummaryModal;
