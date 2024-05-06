import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware((auth, request) => {
  if (!isProtectedRoute(request)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("hello-world", "Hello");

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  } else {
    auth().protect();
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
