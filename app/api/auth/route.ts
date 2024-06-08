import bcrypt from "bcrypt";

import connectDB from "@/lib/db";
// import { signJwt } from "@/lib/utils";
import UserModel, { UserDocument } from "@/models/user.model";
import { NextRequest, NextResponse } from "next/server";

type TLoginBody = {
  email: string;
  password: string;
};

export async function POST(req: NextRequest) {
  if (req.method !== "POST") {
    return new NextResponse("Method not allowed");
  }

  try {
    await connectDB();

    const body: TLoginBody = await req.json();

    if (!body.email || !body.password) {
      return new NextResponse("Email and password are required", {
        status: 400,
      });
    }

    const user = (await UserModel.findOne({
      email: body.email,
      role: "admin",
    }).lean()) as UserDocument;

    console.log("user --->", user);

    if (!user) {
      return new NextResponse("No admin found", { status: 401 });
    }

    // Check authorization

    const isMatch = await bcrypt.compare(body.password, user.password);

    if (!isMatch) {
      return new NextResponse("Invalid credentials", { status: 401 });
    }

    //   Generate JWT
    // const accessToken = signJwt(
    //   { ...user },
    //   { expiresIn: process.env.ACCESS_TOKEN_TTL || "15m" } // 4h or 15 minutes,
    // );

    const response = NextResponse.json({
      // accessToken,
    });

    // response.cookies.set("accessToken", accessToken, {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "strict",
    //   path: "/",
    //   // expires: Number(process.env.ACCESS_TOKEN_TTL_NUMBER) * 60 * 60,
    // });

    return response;
  } catch (error) {
    return new NextResponse("Error when login admin", {
      status: 500,
    });
  }
}
