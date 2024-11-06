import Order from "@/lib/models/order.model";
import Gift from "@/lib/models/gift.model";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ customerId: string }> }
) => {
  try {
    await connectToDB();
    const customerId = await params
    const orders = await Order.find({
      customerClerkId: customerId,
    }).populate({ path: "gifts.gift", model: Gift });

    return NextResponse.json(orders, { status: 200 });
  } catch (err) {
    console.log("[customerId_GET", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
};

export const dynamic = "force-dynamic";
