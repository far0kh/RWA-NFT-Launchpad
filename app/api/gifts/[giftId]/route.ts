import Collection from "@/lib/models/Collection";
import Gift from "@/lib/models/Gift";
import { connectToDB } from "@/lib/mongoDB";
import { auth } from '@clerk/nextjs/server';

import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: { giftId: string } }
) => {
  try {
    await connectToDB();

    const gift = await Gift.findById(params.giftId).populate({
      path: "collections",
      model: Collection,
    });

    if (!gift) {
      return new NextResponse(
        JSON.stringify({ message: "Gift not found" }),
        { status: 404 }
      );
    }
    return new NextResponse(JSON.stringify(gift), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin": `${process.env.BTCGS_APP_URL}`,
        "Access-Control-Allow-Methods": "GET",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    });
  } catch (err) {
    console.log("[giftId_GET]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { giftId: string } }
) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const gift = await Gift.findById(params.giftId);

    if (!gift) {
      return new NextResponse(
        JSON.stringify({ message: "Gift not found" }),
        { status: 404 }
      );
    }

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
      return new NextResponse("Not enough data to create a new gift", {
        status: 400,
      });
    }

    const addedCollections = collections.filter(
      (collectionId: string) => !gift.collections.includes(collectionId)
    );
    // included in new data, but not included in the previous data

    const removedCollections = gift.collections.filter(
      (collectionId: string) => !collections.includes(collectionId)
    );
    // included in previous data, but not included in the new data

    // Update collections
    await Promise.all([
      // Update added collections with this gift
      ...addedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $push: { gifts: gift._id },
        })
      ),

      // Update removed collections without this gift
      ...removedCollections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { gifts: gift._id },
        })
      ),
    ]);

    // Update gift
    const updatedGift = await Gift.findByIdAndUpdate(
      gift._id,
      {
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
      },
      { new: true }
    ).populate({ path: "collections", model: Collection });

    await updatedGift.save();

    return NextResponse.json(updatedGift, { status: 200 });
  } catch (err) {
    console.log("[giftId_POST]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { giftId: string } }
) => {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectToDB();

    const gift = await Gift.findById(params.giftId);

    if (!gift) {
      return new NextResponse(
        JSON.stringify({ message: "Gift not found" }),
        { status: 404 }
      );
    }

    await Gift.findByIdAndDelete(gift._id);

    // Update collections
    await Promise.all(
      gift.collections.map((collectionId: string) =>
        Collection.findByIdAndUpdate(collectionId, {
          $pull: { gifts: gift._id },
        })
      )
    );

    return new NextResponse(JSON.stringify({ message: "Gift deleted" }), {
      status: 200,
    });
  } catch (err) {
    console.log("[giftId_DELETE]", err);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";

