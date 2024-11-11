import { connectToDB } from "@/lib/mongoDB";
import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from "next/server";

import User from "@/lib/models/user.model";
import Newcomer from '@/lib/models/newcomer.model';

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth()

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 })
    }
    const client = await clerkClient();
    const clerkUser = await client.users.getUser(userId!);
    console.log('clerkUser', clerkUser.emailAddresses[0].emailAddress);

    const body = await req.json() as INewcomer

    await connectToDB()
    const user = await User.find({ email_address: clerkUser.emailAddresses[0].emailAddress })
    const newcomer = await Newcomer.create({
      clerk_id: userId,
      db_id: user[0]._id,
      ...body,
    })

    await newcomer.save()

    return NextResponse.json(newcomer, { status: 200 })
  } catch (err) {
    console.log("[newcomer_POST]", err)
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
