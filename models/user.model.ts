import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserInput {
  name: string;
  phone: string;
  password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  verify: boolean;
  role: string;
  avatar?: string;
  geoLocation?: {
    location: {
      type: string;
      coordinates: number[];
      lat: string;
      lon: string;
      displayName: string;
    };
    radius: number;
  };
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    geoLocation: {
      location: {
        type: {
          type: String,
          enum: ["Point"],
        },
        coordinates: {
          type: [Number],
        },
        lat: { type: String },
        lon: { type: String },
        displayName: { type: String },
      },
      radius: { type: Number },
    },
    verify: { type: Boolean },
    role: { type: String },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const UserModel =
  mongoose.models.User || mongoose.model<UserDocument>("User", userSchema);

export default UserModel;
