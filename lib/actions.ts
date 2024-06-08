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

// 4. User actions

// 5. Post actions

// 6. Report actions
