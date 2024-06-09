"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getReports } from "@/lib/actions";
import { EReportReasonTypes, reportReasonTypeToLabel } from "@/lib/utils";
import { TReport } from "@/types/report.type";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import ImageWithFallback from "../ImageWithFallback";
import ReportDeleteBtn from "./ReportDeleteBtn";
import ReportDialog from "./ReportDialog";
import ReportPagination from "./ReportPagination";

const ReportTable = () => {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [hasPreviousPage, setHasPreviousPage] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [reportData, setReportData] = useState<TReport[]>();

  const [refetch, setRefetch] = useState(false);

  const total = useRef(0);

  useEffect(() => {
    (async () => {
      const res = await getReports({ skip: page, limit: 10, search });
      const data = JSON.parse(JSON.stringify(res?.data));
      // console.log("Data----->", data);
      setReportData(data?.reports as any);

      const totalPage = Math.ceil(data?.total / 10);
      total.current = data?.total;
      setHasPreviousPage(page > 1);
      setHasNextPage(page < totalPage);
    })();
  }, [refetch]);

  return (
    <div className="max-h-[calc(100%-40px)] overflow-auto mt-2">
      {/* <div className="flex w-full max-w-sm items-center space-x-2">
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
      </div> */}

      <Table className="mt-2 mb-2">
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>Report ID</TableHead>
            <TableHead>Post</TableHead>
            <TableHead>Reason</TableHead>
            <TableHead>Reporter</TableHead>
            <TableHead className="hidden md:table-cell text-center">
              Date
            </TableHead>
            <TableHead className="text-center">Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {reportData &&
            reportData?.map((report) => {
              return (
                <TableRow key={report._id}>
                  <TableCell>
                    <ImageWithFallback
                      src={report.postId?.images[0] as any}
                      width={45}
                      height={45}
                      alt={report.postId?.title}
                      className="w-45! h-45! object-cover rounded-md"
                    />
                  </TableCell>
                  <TableCell>{report._id}</TableCell>
                  <TableCell>{report.postId?.title}</TableCell>
                  <TableCell className="hidden md:table-cell text-red-500">
                    {
                      reportReasonTypeToLabel[
                        report.reason as EReportReasonTypes
                      ]
                    }
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    {report.reporterId?.name}
                  </TableCell>
                  <TableCell className="text-center hidden md:table-cell">
                    {moment(report.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-1 justify-center items-center">
                      <ReportDialog {...report} />
                      <ReportDeleteBtn {...report} setRefetch={setRefetch} />
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
      </Table>

      {/* pagination */}
      <ReportPagination
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

export default ReportTable;
