"use client";

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
import { TReport } from "@/types/report.type";
import { Trash2 } from "lucide-react";
import { Dispatch, SetStateAction } from "react";
import { useToast } from "../ui/use-toast";
import { deleteReport } from "@/lib/actions";

type ReportDeleteBtnProps = TReport & {
  setRefetch: Dispatch<SetStateAction<boolean>>;
};

function ReportDeleteBtn({ setRefetch, ...report }: ReportDeleteBtnProps) {
  const { toast } = useToast();

  const handleDelete = async () => {
    console.log("Deleting report", report?._id);
    const res = await deleteReport(report?._id);

    if (res && res.success) {
      console.log("Report deleted successfully");
      setRefetch((prev) => !prev);
      toast({
        description: res.message,
      });
    } else {
      console.log("Error deleting post", res.message);
      toast({
        description: res.message,
        variant: "destructive",
      });
    }
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded text-xs">
          <Trash2 />
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            report and relative data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ReportDeleteBtn;
