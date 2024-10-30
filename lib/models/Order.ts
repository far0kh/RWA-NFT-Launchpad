import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerClerkId: String,
  gifts: [
    {
      gift: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Gift",
      },
      color: String,
      size: String,
      quantity: Number,
    },
  ],
  shippingAddress: {
    street: String,
    city: String,
    state: String,
    postalCode: String,
    country: String,
  },
  shippingRate: String,
  totalAmount: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);

export default Order;
