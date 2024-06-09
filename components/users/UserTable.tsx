"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getPosts, getUsers } from "@/lib/actions";
import { TPost } from "@/types/post.type";
import moment from "moment";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import CurrencyFormat from "react-currency-format";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import UserDeleteBtn from "./UserDeleteBtn";
import UserDialog from "./UserDialog";
import UserPagination from "./UserPagination";
import { TUser } from "@/types/user.type";
import DEFAULT_AVATAR from "@/img/default_avatar.jpg";
import ImageWithFallback from "../ImageWithFallback";

const UserTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [userData, setUserData] = useState<TUser[]>();

  const [refetch, setRefetch] = useState(false);

  const total = useRef(0);

  useEffect(() => {
    (async () => {
      const res = await getUsers({ skip: page, limit: 10, search });
      const data = JSON.parse(JSON.stringify(res?.data));
      // console.log("Data----->", data);
      setUserData(data?.users as any);

      const totalPage = Math.ceil(data?.total / 10);
      total.current = data?.total;
      setHasPreviousPage(page > 1);
      setHasNextPage(page < totalPage);
    })();
  }, [refetch]);

  return (
    <div className="max-h-[calc(100%-40px)] overflow-auto mt-2">
      <div className="flex w-full max-w-sm items-center space-x-2">
        <Input
          type="text"
          placeholder="Enter name, phone or email to search..."
          className="focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button
          onClick={() => {
            console.log("Search for", search);
            // reset page to 1
            setPage(1);
            setRefetch((prev) => !prev);
          }}
        >
          Search
        </Button>
      </div>

      <Table className="mt-2 mb-2">
        <TableHeader>
          <TableRow>
            <TableHead>Avatar</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Verify</TableHead>
            <TableHead>Email</TableHead>
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
          {userData &&
            userData?.map((user) => {
              return (
                <TableRow key={user._id}>
                  <TableCell>
                    <ImageWithFallback
                      src={(user.avatar ?? DEFAULT_AVATAR) as any}
                      width={40}
                      height={40}
                      alt={user.name}
                      className="w-10 h-10 object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell className="hidden md:table-cell text-red-500">
                    {user.phone ?? "N/A"}
                  </TableCell>

                  <TableCell className="hidden md:table-cell">
                    {user.verify ? "Yes" : "No"}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {user.email ?? "N/A"}
                  </TableCell>
                  <TableCell className=" ">
                    {user.geoLocation?.location?.displayName ?? "N/A"}
                  </TableCell>
                  <TableCell className="text-center hidden md:table-cell">
                    {moment(user.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 justify-center items-center">
                      <UserDialog {...user} />
                      <UserDeleteBtn {...user} setRefetch={setRefetch} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      {/* pagination */}
      <UserPagination
        hasPreviousPage={hasPreviousPage}
        hasNextPage={hasNextPage}
        currentPage={page}
        onPageChange={setPage}
        setRefetch={setRefetch}
        total={total.current}
      />
    </div>
  );
};

export default UserTable;
