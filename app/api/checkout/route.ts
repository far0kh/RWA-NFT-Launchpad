import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: NextRequest) {
  try {
    const { giftboxItems, customer } = await req.json();

    if (!giftboxItems || !customer) {
      return new NextResponse("Not enough data to checkout", { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      shipping_address_collection: {
        allowed_countries: ["US", "CA"],
      },
      shipping_options: [
        { shipping_rate: "shr_1MfufhDgraNiyvtnDGef2uwK" },
        { shipping_rate: "shr_1OpHFHDgraNiyvtnOY4vDjuY" },
      ],
      line_items: giftboxItems.map((giftboxItem: any) => ({
        price_data: {
          currency: "cad",
          gift_data: {
            name: giftboxItem.item.title,
            metadata: {
              giftId: giftboxItem.item._id,
              ...(giftboxItem.size && { size: giftboxItem.size }),
              ...(giftboxItem.color && { color: giftboxItem.color }),
            },
          },
          unit_amount: giftboxItem.item.price * 100,
        },
        quantity: giftboxItem.quantity,
      })),
      client_reference_id: customer.clerkId,
      success_url: `${process.env.BTCGS_APP_URL}/payment_success`,
      cancel_url: `${process.env.BTCGS_APP_URL}/giftbox`,
    });

    return NextResponse.json(session, { headers: corsHeaders });
  } catch (err) {
    console.log("[checkout_POST]", err);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
