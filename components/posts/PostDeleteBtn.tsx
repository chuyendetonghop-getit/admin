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
import { deletePost } from "@/lib/actions";
import { TPost } from "@/types/post.type";
import { Trash2 } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { Dispatch, SetStateAction } from "react";

type PostDeleteBtnProps = TPost & {
  setRefetch: Dispatch<SetStateAction<boolean>>;
};

function PostDeleteBtn({ setRefetch, ...post }: PostDeleteBtnProps) {
  const { toast } = useToast();

  const handleDelete = async () => {
    console.log("Deleting post", post?._id);
    const res = await deletePost(post?._id);

    if (res && res.success) {
      console.log("Post deleted successfully");
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
            This action cannot be undone. This will permanently delete this post
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

export default PostDeleteBtn;
