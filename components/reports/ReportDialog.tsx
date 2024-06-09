import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TReport } from "@/types/report.type";
import { Label } from "@radix-ui/react-label";
import { Eye } from "lucide-react";
import moment from "moment";
import ImageWithFallback from "../ImageWithFallback";
import { EReportReasonTypes, reportReasonTypeToLabel } from "@/lib/utils";

type ReportDialogProps = TReport;

function ReportDialog(report: ReportDialogProps) {
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
          <DialogTitle>Report ID: {report?._id}</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col">
          <div className="content-top flex gap-4">
            <ImageWithFallback
              src={report.postId?.images[0] as any}
              width={180}
              height={180}
              alt={report.postId?.title}
              className="w-45 h-45 object-cover rounded-md"
            />
            <div className="ml-4">
              <div className="flex justify-start items-center gap-4">
                <Label className="font-bold text-sm">Post title: </Label>
                <p>{report.postId?.title}</p>
              </div>
              <div className="flex justify-start items-center gap-4">
                <Label className="font-bold text-sm">Reporter: </Label>
                <p>{report.reporterId.name}</p>
              </div>
              <div className="flex justify-start items-center gap-4">
                <Label className="font-bold text-sm">Reason: </Label>
                <p className="text-red-600 font-bold">
                  {reportReasonTypeToLabel[report.reason as EReportReasonTypes]}
                </p>
              </div>
              <div className="flex justify-start items-center gap-4">
                <Label className="font-bold text-sm">Post contact: </Label>
                <p>{report?.postId?.phone}</p>
              </div>
              <div className="flex justify-start items-center gap-4">
                <Label className="font-bold text-sm">Reporter contact: </Label>
                <p>{report?.reporterId?.phone}</p>
              </div>
              <div className="flex justify-start items-center gap-4">
                <Label className="font-bold text-sm">Created at: </Label>
                <p>
                  {moment(report.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default ReportDialog;
