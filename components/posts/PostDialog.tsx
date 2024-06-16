import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye } from "lucide-react";
import { TPost } from "@/types/post.type";
import Image from "next/image";
import CurrencyFormat from "react-currency-format";
import moment from "moment";
import { Textarea } from "../ui/textarea";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";

type PostDialogProps = TPost;

function PostDialog(post: PostDialogProps) {
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
          <DialogTitle>{post.title}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col">
          <div className="content-top flex gap-4">
            {post.images.length > 1 ? (
              <div className="images px-8">
                <Carousel>
                  <CarouselContent className="ctn">
                    {post.images.map((image, index) => (
                      <CarouselItem>
                        <Image
                          src={image}
                          width={180}
                          height={180}
                          alt={post.title}
                          className="w-full h-full object-contain rounded-md"
                        />
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            ) : (
              <Image
                src={post.images[0]}
                width={180}
                height={180}
                alt={post.title}
                className="w-45 h-45 object-cover rounded-md"
              />
            )}
            <div className="ml-4">
              <div className="flex justify-start items-center gap-4">
                <Label className="font-bold text-sm">Post ID: </Label>
                <p>{post._id}</p>
              </div>
              <div className="flex justify-start items-center gap-4">
                <Label className="font-bold text-sm">Author: </Label>
                <p>{post?.userId?.name}</p>
              </div>
              <div className="flex justify-start items-center gap-4">
                <Label className="font-bold text-sm">Price: </Label>
                <CurrencyFormat
                  value={post.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix=" đ"
                  renderText={(value) => (
                    <p className="text-red-600 font-bold">{value}</p>
                  )}
                />
              </div>
              <div className="flex justify-start items-center gap-4">
                <Label className="font-bold text-sm">Category: </Label>
                <p>{post?.category?.cat_name}</p>
              </div>
              <div className="flex justify-start items-center gap-4">
                <Label className="font-bold text-sm">Status: </Label>
                <p>{post?.status?.name}</p>
              </div>
              <div className="flex justify-start items-center gap-4">
                <Label className="font-bold text-sm">Contact: </Label>
                <p>{post.phone}</p>
              </div>
              <div className="flex justify-start items-center gap-4">
                <Label className="font-bold text-sm">Location: </Label>
                <p>{post?.location?.displayName}</p>
              </div>
              <div className="flex justify-start items-center gap-4">
                <Label className="font-bold text-sm">Created at: </Label>
                <p>
                  {moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </p>
              </div>
            </div>
          </div>

          <div className="content-bottom flex items-center justify-start mt-4">
            {post.description}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default PostDialog;
