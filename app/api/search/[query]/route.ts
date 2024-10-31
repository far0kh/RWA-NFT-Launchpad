import Gift from "@/lib/models/Gift";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ query: string }> }) => {
  try {
    await connectToDB()
    const { query } = await params
    const searchedGifts = await Gift.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { category: { $regex: query, $options: "i" } },
        { tags: { $in: [new RegExp(query, "i")] } } // $in is used to match an array of values
      ]
    })

    return NextResponse.json(searchedGifts, { status: 200 })
  } catch (err) {
    console.log("[search_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const dynamic = "force-dynamic";
