import mongoose, { Schema } from "mongoose";
import { TInventory, TProducts, TVariants } from "./products.interface";

const variantSchema = new Schema<TVariants>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});
const inventorySchema = new Schema<TInventory>({
  quantity: {
    type: Number,
    required: true,
    default: 0,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
});
const productsSchema = new Schema<TProducts>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  variants: [variantSchema],
  inventory: inventorySchema,
});

export const Products = mongoose.model<TProducts>("Products", productsSchema);
