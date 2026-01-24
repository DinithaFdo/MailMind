// DeleteSummaryDialog.tsx
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"; // Make sure to import these from the correct path

interface DeleteSummaryDialogProps {
  open: boolean;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteSummaryDialog = ({
  open,
  onClose,
  onDelete,
}: DeleteSummaryDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={() => onClose()}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Are you sure you want to delete this summary?
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. The summary will be permanently
            deleted.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteSummaryDialog;
