import mongoose from "mongoose";

const ConversationSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Post",
    },
    participants: [
      { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    ],
    // Optional: Last message details for quick overview
    // In case of initial message, lastMessage will be null
    lastMessage: {
      senderId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      text: String,
      createdAt: Date,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ConversationModel =
  mongoose.models.Conversation ||
  mongoose.model("Conversation", ConversationSchema);

export default ConversationModel;
