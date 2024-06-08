import mongoose from "mongoose";

const ReportSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    reason: {
      type: String,
      required: true,
    },
    reporterId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ReportModel = mongoose.model("Report", ReportSchema);

export default ReportModel;
