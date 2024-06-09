"use client";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Dispatch, SetStateAction } from "react";

type ReportPaginationProps = {
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  currentPage: number;
  onPageChange: (page: number) => void;
  setRefetch: Dispatch<SetStateAction<boolean>>;
  total: number;
};

const ReportPagination = ({
  hasPreviousPage,
  hasNextPage,
  currentPage,
  onPageChange,
  setRefetch,
  total,
}: ReportPaginationProps) => {
  const renderHasPreviousClass = hasPreviousPage
    ? "cursor-pointer opacity-100"
    : "cursor-not-allowed opacity-50";

  const renderHasNextClass = hasNextPage
    ? "cursor-pointer opacity-100"
    : "cursor-not-allowed opacity-50";

  const handlePageChange = (page: number, type: "up" | "down") => {
    if (type === "up" && hasNextPage) {
      onPageChange(currentPage + 1);
      setRefetch((prev) => !prev);
    } else if (type === "down" && hasPreviousPage) {
      onPageChange(currentPage - 1);
      setRefetch((prev) => !prev);
    }
  };
  return (
    <div className="relative">
      <div className="absolute left-0 translate-y-[50%] text-sm text-gray-500">
        Total: {total} documents
      </div>
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              className={renderHasPreviousClass}
              onClick={() => {
                handlePageChange(currentPage, "down");
              }}
            />
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              className={renderHasPreviousClass}
              onClick={() => {
                handlePageChange(currentPage, "down");
              }}
            >
              {currentPage - 1}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink className="bg-blue-500 text-white">
              {currentPage}
            </PaginationLink>
          </PaginationItem>

          <PaginationItem>
            <PaginationLink
              className={renderHasNextClass}
              onClick={() => {
                handlePageChange(currentPage, "up");
              }}
            >
              {currentPage + 1}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem></PaginationItem>
          <PaginationItem>
            <PaginationNext
              className={renderHasNextClass}
              onClick={() => {
                handlePageChange(currentPage, "up");
              }}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ReportPagination;
