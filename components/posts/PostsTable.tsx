"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPosts } from "@/lib/actions";
import { TPost } from "@/types/post.type";
import moment from "moment";
import Image from "next/image";
import { useEffect, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import PostDeleteBtn from "./PostDeleteBtn";
import PostDialog from "./PostDialog";

interface PostsTableProps {
  limit?: number;
  title?: string;
}

const PostsTable = ({ limit, title }: PostsTableProps) => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [postData, setPostData] = useState<TPost[]>();

  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    (async () => {
      const res = await getPosts({ skip: page, limit: 10, search });
      const data = JSON.parse(JSON.stringify(res?.data));
      // console.log("Data----->", data);
      setPostData(data as any);
    })();
  }, [refetch]);

  return (
    <div className="max-h-[calc(100%-40px)] overflow-auto mb-2 mt-2">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="email"
          placeholder="Email"
          className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          onClick={() => {
            console.log("Search for", search);
          }}
        >
          Search
        </Button>
      </div>

      <Table className="mt-2">
        <TableHeader>
          <TableRow>
            <TableHead> </TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="hidden md:table-cell text-center">
              Location
            </TableHead>
            <TableHead className="hidden md:table-cell text-center">
              Date
            </TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {postData &&
            postData?.map((post) => (
              <TableRow key={post._id}>
                <TableCell>
                  <Image
                    src={post.images[0]}
                    width={40}
                    height={40}
                    alt={post.title}
                    className="w-10 h-10 object-cover rounded-md"
                  />
                </TableCell>
                <TableCell>{post.title}</TableCell>
                {/* <TableCell className="hidden md:table-cell text-red-500">
                  {post.price}
                </TableCell> */}
                <CurrencyFormat
                  value={post.price}
                  displayType={"text"}
                  thousandSeparator={true}
                  suffix=" đ"
                  renderText={(value) => (
                    <TableCell className="hidden md:table-cell font-bold text-red-500">
                      {value}
                    </TableCell>
                  )}
                />
                <TableCell className="hidden md:table-cell">
                  {post.category?.cat_name}
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  {post.location?.displayName}
                </TableCell>
                <TableCell className="text-center hidden md:table-cell">
                  {moment(post.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </TableCell>
                <TableCell>
                  <div className="flex gap-1 justify-center items-center">
                    {/* <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded text-xs">
                      <Eye />
                    </button> */}
                    <PostDialog {...post} />
                    <PostDeleteBtn {...post} setRefetch={setRefetch} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostsTable;
