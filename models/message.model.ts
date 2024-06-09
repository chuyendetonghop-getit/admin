import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    originId: {
      type: String,
      required: true,
    },
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Conversation",
    },
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    text: { type: String },
    image: { type: String },
    createdAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const MessageModel =
  mongoose.models.Message || mongoose.model("Message", MessageSchema);

export default MessageModel;
