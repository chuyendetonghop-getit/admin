import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";
import { TModelAggregateResponse } from "@/types/analytics";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// ------------------------------
// 12 months name in a array
export const monthsInYear = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const formatDataForRecharts = (props: TModelAggregateResponse) => {
  const userStats = props?.userStats ?? [];
  const postStats = props?.postStats ?? [];
  const reportStats = props?.reportStats ?? [];
  const data = Array(12)
    .fill(0)
    .map((_, i) => ({
      month: monthsInYear[i],
      users: 0,
      posts: 0,
      reports: 0,
    }));

  userStats.forEach((stat) => {
    data[stat._id - 1].users = stat.count;
  });

  postStats.forEach((stat) => {
    data[stat._id - 1].posts = stat.count;
  });

  reportStats.forEach((stat) => {
    data[stat._id - 1].reports = stat.count;
  });

  return data;
};
// ------------------------------
