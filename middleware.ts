import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { SignJWT, jwtVerify, type JWTPayload } from "jose";

const authPaths = ["/auth"];
const privatePaths = ["/", "/users", "/posts", "/reports"];

export async function middleware(request: NextRequest) {
  const pathName = request.nextUrl.pathname;
  console.log("pathName", pathName);

  // Use cookieStore to get the cookie
  const cookie = cookies().get("accessToken")?.value;
  console.log("cookie", cookie);

  // If the user is trying to access an auth path but already has a valid cookie
  if (pathName !== "/auth" && !cookie) {
    console.log("private path + NO cookie");
    return NextResponse.redirect(new URL("/auth", request.url));
  } else if (pathName === "/auth" && cookie) {
    console.log("auth path + cookie", cookie);
    return NextResponse.redirect(new URL("/", request.url));
  }

  // validate the cookie
  try {
    if (!cookie) {
      console.log("NO cookie");
      return;
    }

    const theSecret = process.env.THE_SECRET;
    const { payload } = await jwtVerify(
      cookie as string,
      new TextEncoder().encode(theSecret)
    );
    console.log("payload", payload);
  } catch (error) {
    console.log("error catch validate cookie", error);
    request.cookies.delete("accessToken");
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/auth", "/users/:path*", "/posts/:path*", "/reports/:path*"],
};
