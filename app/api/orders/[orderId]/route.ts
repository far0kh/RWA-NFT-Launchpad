import Customer from "@/lib/models/Customer";
import Order from "@/lib/models/Order";
import Gift from "@/lib/models/Gift";
import { connectToDB } from "@/lib/mongoDB";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest, { params }: { params: Promise<{ orderId: String }> }) => {
  try {
    await connectToDB()
    const { orderId } = await params
    const orderDetails = await Order.findById(orderId).populate({
      path: "gifts.gift",
      model: Gift
    })

    if (!orderDetails) {
      return new NextResponse(JSON.stringify({ message: "Order Not Found" }), { status: 404 })
    }

    const customer = await Customer.findOne({ clerkId: orderDetails.customerClerkId })

    return NextResponse.json({ orderDetails, customer }, { status: 200 })
  } catch (err) {
    console.log("[orderId_GET]", err)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

export const dynamic = "force-dynamic";
