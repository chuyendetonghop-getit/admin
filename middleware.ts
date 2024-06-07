import { NextRequest, NextResponse } from "next/server";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  console.log("Middleware called");

  let cookie = request.cookies.get("nextjs");
  console.log("Cookie: ", cookie);

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  //   matcher: "/about/:path*",
};
