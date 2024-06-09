import { category, statusPost } from "@/lib/utils";

export type TCategoryItem = (typeof category)[number];

export type TStatusItem = (typeof statusPost)[number];

export type TLocationPost = {
  type: string;
  coordinates: [number, number];
  lat: string;
  lon: string;
  displayName: string;
};

export type TGeoLocation = {
  location: TLocationPost;
  radius: number;
};

export type TPost = {
  _id: string;
  userId: string;
  location: TLocationPost;
  category: TCategoryItem;
  images: string[];
  title: string;
  price: number;
  status: TStatusItem;
  description: string;
  phone: string;
  createdAt: string;
  updatedAt: string;
};
