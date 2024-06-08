import mongoose from "mongoose";

const PostSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    location: {
      type: {
        type: String,
        enum: ["Point"], // Chỉ cho phép kiểu là 'Point'
        required: true,
      },
      coordinates: {
        type: [Number], // Mảng các số, lưu trữ kinh độ (longitude) trước, sau đó là vĩ độ (latitude)
        required: true,
      },
      lat: { type: String, required: true },
      lon: { type: String, required: true },
      displayName: { type: String, required: true },
    },
    category: {
      cat_id: { type: String, required: true },
      cat_image: { type: String, required: true },
      cat_name: { type: String, required: true },
      cat_icon: { type: String, required: true },
      position: { type: Number, required: true },
    },
    images: [{ type: String, required: true }],
    title: { type: String, required: true },
    price: { type: Number, required: true },
    status: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      name_en: { type: String, required: true },
      description: { type: String, required: true },
    },
    description: { type: String, required: true },
    phone: { type: String, required: true },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const PostModel = mongoose.models.Post || mongoose.model("Post", PostSchema);

export default PostModel;
