"use server";

import UserModel, { UserDocument } from "@/models/user.model";
import bcrypt from "bcrypt";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import connectDB from "./db";
import { SignJWT } from "jose";
import { revalidatePath } from "next/cache";
import PostModel from "@/models/post.model";
import ReportModel from "@/models/report.model";
import exp from "constants";
import { formatDataForRecharts } from "./utils";
import { TModelAggregateResponse } from "@/types/analytics";

// 1. Auth actions
export async function loginAction(data: FormData) {
  const email = data.get("email");
  const password = data.get("password");

  console.log("AC> Login action called", email, password);

  if (!email || !password) {
    console.log("Email or password is missing");
    return {
      success: false,
      message: "Email or password is missing",
    };
  }

  try {
    await connectDB();

    const user = (await UserModel.findOne({
      email: email,
      role: "admin",
    }).lean()) as UserDocument;
    console.log("user --->", user);

    if (!user) {
      return {
        success: false,
        message: "No admin found",
      };
    }

    // Check authorization
    const isMatch = await bcrypt.compare(password as string, user.password);

    if (!isMatch) {
      return {
        success: false,
        message: "Invalid credentials",
      };
    }

    //   Generate JWT
    const theSecret = process.env.THE_SECRET;
    const iat = Math.floor(Date.now() / 1000);
    const exp = iat + 60 * 60 * Number(process.env.ACCESS_TOKEN_TTL_NUMBER); // 4 hour

    const accessToken = await new SignJWT({ ...user })
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setExpirationTime(exp)
      .setIssuedAt(iat)
      .setNotBefore(iat)
      .sign(new TextEncoder().encode(theSecret));

    await cookies().set({
      name: "accessToken",
      value: accessToken,
      path: "/",
      httpOnly: true,
      secure: true,
      expires: new Date(
        Date.now() +
          1000 * 60 * 60 * Number(process.env.ACCESS_TOKEN_TTL_NUMBER)
      ), // 4h
    });
  } catch (error: any) {
    console.log("Error in loginAction", error);
    throw new Error(error);
  }
  redirect("/");
}

// ------------------------------
export async function logoutAction() {
  cookies().delete("accessToken");
  console.log(" => -----------------------------");
  // redirect("/auth");
}
// ------------------------------

// 3.Dashboard actions
export async function getDashboardCommonStatistics() {
  try {
    await connectDB();

    const userNumber = await UserModel.countDocuments({ role: "user" });
    const postNumber = await PostModel.countDocuments();
    const reportNumber = await ReportModel.countDocuments();
    const data = [userNumber, postNumber, reportNumber];
    return {
      success: true,
      data: data,
    };
  } catch (error: any) {
    console.log("Error in getDashboardCommonStatistics", error);
    return {
      success: false,
      message: error ?? error.message,
    };
  }
}

// ------------------------------

export async function getDashboardAnalytics() {
  try {
    await connectDB();

    const currentYear = new Date().getFullYear();

    const userAggregation = UserModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const postAggregation = PostModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const reportAggregation = ReportModel.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lt: new Date(`${currentYear + 1}-01-01`),
          },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    const [userStats, postStats, reportStats] = await Promise.all([
      userAggregation,
      postAggregation,
      reportAggregation,
    ]);

    // console.log("1. userStats", userStats);
    // console.log("2. postStats", postStats);
    // console.log("3. reportStats", reportStats);

    const finalData = formatDataForRecharts({
      userStats,
      postStats,
      reportStats,
    });

    // console.log(finalData);

    return finalData;
  } catch (error: any) {
    console.log("Error in getDashboardAnalytics", error);
  }
}

// 4. User actions

// 5. Post actions

// get posts from db with limit, skip, search
export async function getPosts({
  limit = 10,
  skip = 1,
  search,
}: {
  limit?: number;
  skip?: number;
  search?: string;
}) {
  try {
    await connectDB();

    const query = search
      ? {
          title: { $regex: search, $options: "i" },
        }
      : {};

    const posts = await PostModel.find(query)
      .sort({ createdAt: 1 })
      .skip((skip - 1) * limit ?? 0)
      .limit(limit ?? 10)
      .lean();

    // console.log("Posts", posts);

    return {
      success: true,
      data: posts,
    };
  } catch (error: any) {
    console.log("Error in getPosts", error);
    return {
      success: false,
      message: error ?? error.message,
    };
  }
}

// 6. Report actions
