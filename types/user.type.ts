import { TGeoLocation } from "./post.type";

export type TUser = {
  _id: string;
  name: string;
  phone: string;
  verify: boolean;
  role: string;
  email?: string;
  avatar?: string;
  geoLocation?: TGeoLocation;
  createdAt: string;
  updatedAt: string;
};
