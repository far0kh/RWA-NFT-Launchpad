import { connectToDB } from "@/lib/mongoDB";
import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from "next/server";

import User from "@/lib/models/user.model";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const user = await req.json() as UserType

    await connectToDB()
    const editedUser = await User.findOneAndUpdate(
      { email_address: user.email_address },
      user,
      { upsert: true, new: true }
    )

    return NextResponse.json(editedUser, { status: 200 })
  } catch (err) {
    console.log("[profile_POST]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = await auth()

    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId!);
    const { db_user_id } = clerkUser.publicMetadata as ClerkMetadata;

    await connectToDB()
    const user = await User.find({ _id: db_user_id })

    return NextResponse.json(user, { status: 200 })
  } catch (err) {
    console.log("[collections_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const dynamic = "force-dynamic";
