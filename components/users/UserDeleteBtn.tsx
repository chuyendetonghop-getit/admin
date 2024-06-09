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
import { TUser } from "@/types/user.type";
import { Trash2 } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { Dispatch, SetStateAction } from "react";
import { deleteUser } from "@/lib/actions";

type UserDeleteBtnProps = TUser & {
  setRefetch: Dispatch<SetStateAction<boolean>>;
};

function UserDeleteBtn({ setRefetch, ...user }: UserDeleteBtnProps) {
  const { toast } = useToast();

  const handleDelete = async () => {
    console.log("Deleting post", user?._id);
    const res = await deleteUser(user?._id);

    if (res && res.success) {
      console.log("User deleted successfully");
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
            This action cannot be undone. This will permanently delete this user
            and relative data.
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

export default UserDeleteBtn;
