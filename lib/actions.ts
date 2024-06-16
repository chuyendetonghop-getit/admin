"use server";

import ConversationModel from "@/models/conversation.model";
import PostModel from "@/models/post.model";
import ReportModel from "@/models/report.model";
import UserModel, { UserDocument } from "@/models/user.model";
import bcrypt from "bcrypt";
import { SignJWT } from "jose";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import connectDB from "./db";
import { formatDataForRecharts } from "./utils";
import mongoose, { mongo } from "mongoose";
import MessageModel from "@/models/message.model";

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

export async function getUsers({
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

    let query = {
      role: "user",
    };

    if (search) {
      query = {
        ...query,
        // @ts-ignore
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
        ],
      };
    }

    const users = await UserModel.find(query, {})
      .sort({ createdAt: -1 })
      .skip((skip - 1) * limit ?? 0)
      .limit(limit ?? 10)
      .lean();

    // console.log("Users", users);
    const userCount = await UserModel.countDocuments(query);

    return {
      success: true,
      data: { users, total: userCount },
    };
  } catch (error: any) {
    console.log("Error in getUsers", error);
    return {
      success: false,
      message: error ?? error.message,
    };
  }
}

export async function deleteUser(userId: string) {
  try {
    await connectDB();

    const user = await UserModel.exists({
      _id: userId,
    });

    if (!user) {
      return {
        success: false,
        message: "User not found",
      };
    }

    // If user found, delete it and related data conversations, reports

    // 1. Delete user
    await UserModel.findOneAndDelete({
      _id: new mongoose.Types.ObjectId(userId),
    });
    // 2. Delete posts
    await PostModel.deleteMany({ _id: new mongoose.Types.ObjectId(userId) });
    // 3. Delete conversations
    const conversations = await ConversationModel.find({
      // user in participants
      participants: {
        $in: [new mongoose.Types.ObjectId(userId)],
      },
    });
    // 4. Delete messages in conversations
    for (let conversation of conversations) {
      await ConversationModel.findOneAndDelete({
        _id: conversation._id,
      });

      // Delete messages
      await MessageModel.deleteMany({
        conversationId: conversation._id,
      });
    }

    // 5. Delete reports
    await ReportModel.deleteMany({
      // user match reporterId
      reporterId: userId,
    });

    return {
      success: true,
      message: "User deleted successfully",
    };
  } catch (error: any) {
    console.log("Error in deleteUser", error);
    return {
      success: false,
      message: error ?? error.message,
    };
  }
}

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
      .populate("userId")
      .sort({ createdAt: -1 })
      .skip((skip - 1) * limit ?? 0)
      .limit(limit ?? 10)
      .lean();

    // console.log("Posts", posts);
    const postCount = await PostModel.countDocuments(query);

    return {
      success: true,
      data: { posts, total: postCount },
    };
  } catch (error: any) {
    console.log("Error in getPosts", error);
    return {
      success: false,
      message: error ?? error.message,
    };
  }
}

export async function deletePost(postId: string) {
  try {
    await connectDB();

    const post = await PostModel.exists({
      _id: postId,
    });

    if (!post) {
      return {
        success: false,
        message: "Post not found",
      };
    }

    // If post found, delete it and related data conversations, reports

    // 1. Delete post
    await PostModel.findOneAndDelete({ _id: postId });
    // 2. Delete conversations
    await ConversationModel.deleteMany({ postId });
    // 3. Delete reports
    await ReportModel.deleteMany({ postId });

    return {
      success: true,
      message: "Post deleted successfully",
    };
  } catch (error: any) {
    console.log("Error in deletePost", error);
    return {
      success: false,
      message: error ?? error.message,
    };
  }
}

// 6. Report actions

export async function getReports({
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

    const reports = await ReportModel.find(query)
      .populate("postId")
      .populate("reporterId")
      .sort({ createdAt: -1 })
      .skip((skip - 1) * limit ?? 0)
      .limit(limit ?? 10)
      .lean();

    // console.log("Reports", reports);
    const reportCount = await ReportModel.countDocuments(query);

    return {
      success: true,
      data: { reports, total: reportCount },
    };
  } catch (error: any) {
    console.log("Error in getReports", error);
    return {
      success: false,
      message: error ?? error.message,
    };
  }
}

export async function deleteReport(reportId: string) {
  try {
    await connectDB();

    const report = await ReportModel.exists({
      _id: reportId,
    });

    if (!report) {
      return {
        success: false,
        message: "Report not found",
      };
    }

    // If report found, delete it
    await ReportModel.findOneAndDelete({ _id: reportId });

    return {
      success: true,
      message: "Report deleted successfully",
    };
  } catch (error: any) {
    console.log("Error in deleteReport", error);
    return {
      success: false,
      message: error ?? error.message,
    };
  }
}
