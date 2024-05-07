import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/dashboard(.*)"]);

export default clerkMiddleware((auth, request) => {
  if (!isProtectedRoute(request)) {
    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("hello-world-public", "Hello from public route");

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  } else {
    auth().protect();

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("hello-world-protected", "Hello from protected route");

    const response = NextResponse.next({
      request: {
        headers: requestHeaders,
      },
    });

    return response;
  }
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
