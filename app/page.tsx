import { auth } from '@clerk/nextjs/server';
import { SignUpButton, SignedIn, SignedOut, UserButton } from '@clerk/nextjs'

export default async function Home() {

  const { userId } = await auth()

  if (!userId) {
    return (
      <div>Sign in</div>
    );
  }

  return (
    <div>
      <SignedIn>
        <UserButton
          appearance={{
            layout: {
              logoPlacement: "none",
            },
            elements: {
              userButtonAvatarBox: "h-9 w-9",
            },
          }}
        />
      </SignedIn>
    </div>
  );
}
