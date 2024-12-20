import Gift from "@/lib/models/gift.model";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ giftId: string }> }) => {
  try {
    await connectToDB()
    const { giftId } = await params
    const gift = await Gift.findById(giftId)

    if (!gift) {
      return new NextResponse(JSON.stringify({ message: "Gift not found" }), { status: 404 })
    }

    const relatedGifts = await Gift.find({
      $or: [
        { category: gift.category },
        { collections: { $in: gift.collections } }
      ],
      _id: { $ne: gift._id } // Exclude the current gift
    })

    if (!relatedGifts) {
      return new NextResponse(JSON.stringify({ message: "No related gifts found" }), { status: 404 })
    }

    return NextResponse.json(relatedGifts, { status: 200 })
  } catch (err) {
    console.log("[related_GET", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const dynamic = "force-dynamic";
