import { TPost } from "./post.type";
import { TUser } from "./user.type";

export type TReport = {
  _id: string;
  postId: TPost;
  reason: string;
  reporterId: TUser;
  createdAt: string;
};
