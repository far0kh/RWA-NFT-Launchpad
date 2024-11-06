import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from "next/server";

import { connectToDB } from "@/lib/mongoDB";
import Gift from "@/lib/models/gift.model";
import Collection from "@/lib/models/collection.model";

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const {
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    } = await req.json();

    if (!title || !description || !media || !category || !price || !expense) {
      return new NextResponse("Not enough data to create a gift", {
        status: 400,
      });
    }

    const newGift = await Gift.create({
      title,
      description,
      media,
      category,
      collections,
      tags,
      sizes,
      colors,
      price,
      expense,
    });

    await newGift.save();

    if (collections) {
      for (const collectionId of collections) {
        const collection = await Collection.findById(collectionId);
        if (collection) {
          collection.gifts.push(newGift._id);
          await collection.save();
        }
      }
    }

    return NextResponse.json(newGift, { status: 200 });
  } catch (err) {
    console.log("[gifts_POST]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const GET = async (req: NextRequest) => {
  try {
    await connectToDB();

    const gifts = await Gift.find()
      .sort({ createdAt: "desc" })
      .populate({ path: "collections", model: Collection });
    // console.log('gifts', gifts);


    return NextResponse.json(gifts, { status: 200 });
  } catch (err) {
    console.log("[gifts_GET]", err);
    return new NextResponse("Internal Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";

