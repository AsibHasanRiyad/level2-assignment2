import { TOrders } from "./orders.interface";
import mongoose, { Schema } from "mongoose";

const orderSchema = new Schema<TOrders>({
  email: {
    type: String,
    required: true,
  },
  productId: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

export const Orders = mongoose.model<TOrders>("Orders", orderSchema);
