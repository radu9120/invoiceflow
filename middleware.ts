import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Define which routes should be protected
const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/clients(.*)",
  "/invoices(.*)",
  "/settings(.*)",
  "/profile(.*)",
]);

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/webhooks(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const { userId } = await auth();

  // Redirect logged-in users from home page to dashboard
  if (req.nextUrl.pathname === "/" && userId) {
    return Response.redirect(new URL("/dashboard", req.url));
  }

  // Allow public routes to pass through
  if (isPublicRoute(req)) return;

  // Protect all other routes
  if (isProtectedRoute(req)) {
    if (!userId) {
      const url = new URL("/sign-in", req.url);
      return Response.redirect(url.toString());
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
