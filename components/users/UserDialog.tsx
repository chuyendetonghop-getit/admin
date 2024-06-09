import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DEFAULT_AVATAR from "@/img/default_avatar.jpg";
import { TUser } from "@/types/user.type";
import { Label } from "@radix-ui/react-label";
import { Eye } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import ImageWithFallback from "../ImageWithFallback";

type UserDialogProps = TUser;

function UserDialog(user: UserDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {/* <Button variant="outline">Edit Profile</Button> */}
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs">
          <Eye />
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>{user?.name}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col">
          <div className="content-top flex gap-4">
            <ImageWithFallback
              src={user.avatar as any}
              width={180}
              height={180}
              alt={user.name}
              className="w-45 h-45 object-cover rounded-md"
            />
            <div className="ml-4">
              <div className="flex justify-start items-center gap-4">
                <Label className="font-bold text-sm">User ID: </Label>
                <p>{user._id}</p>
              </div>
              <div className="flex justify-start items-center gap-4">
                <Label className="font-bold text-sm">Name: </Label>
                <p>{user.name}</p>
              </div>
              <div className="flex justify-start items-center gap-4">
                <Label className="font-bold text-sm">Phone: </Label>
                <p className="text-red-600 font-bold">{user.phone}</p>
              </div>
              <div className="flex justify-start items-center gap-4">
                <Label className="font-bold text-sm">Verify: </Label>
                <p>{user?.verify ? "Yes" : "No"}</p>
              </div>
              <div className="flex justify-start items-center gap-4">
                <Label className="font-bold text-sm">Email: </Label>
                <p>{user?.email ? user?.email : "N/A"}</p>
              </div>
              <div className="flex justify-start items-center gap-4">
                <Label className="font-bold text-sm">Location: </Label>
                <p>{user?.geoLocation?.location?.displayName}</p>
              </div>
              <div className="flex justify-start items-center gap-4">
                <Label className="font-bold text-sm">Created at: </Label>
                <p>
                  {moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default UserDialog;
