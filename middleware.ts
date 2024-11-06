import { clerkClient, clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

const isPublicRoute = createRouteMatcher(['/log-in(.*)', '/sign-up(.*)', '/test(.*)', '/(api|trpc)(.*)'])

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
    console.log('is_verified_artist', is_verified_artist);

    // development environment
    if (typeof is_verified_artist === 'undefined') {
      is_verified_artist = true;
    }

    if (userId && !isPublicRoute(req) && !is_verified_artist) {
      return NextResponse.redirect(new URL("/test", req.url))
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