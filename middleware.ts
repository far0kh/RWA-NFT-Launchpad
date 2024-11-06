import { clerkClient, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/log-in(.*)', '/sign-up(.*)', '/test(.*)', '/(api|trpc)(.*)'])
const isWelcomeRoute = createRouteMatcher(['/welcome(.*)'])

// export default clerkMiddleware(async (auth, request) => {
//   if (!isPublicRoute(request)) {
//     await auth.protect()
//   }
// })

export default clerkMiddleware(async (auth, req) => {
  const { userId, redirectToSignIn } = await auth();

  if (!userId && !isPublicRoute(req)) {
    // Add custom logic to run before redirecting
    return redirectToSignIn()
  }

  if (userId) {
    const client = await clerkClient();
    const user = await client.users.getUser(userId);
    let { is_verified_artist } = user.publicMetadata as ClerkMetadata;

    // development environment
    if (typeof is_verified_artist === 'undefined') {
      is_verified_artist = true;
    }

    if (userId && !is_verified_artist && !isWelcomeRoute(req)) {
      return NextResponse.redirect(new URL("/welcome", req.url))
    }
    if (userId && is_verified_artist && isWelcomeRoute(req)) {
      return NextResponse.redirect(new URL("/", req.url))
    }
  }


})

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}