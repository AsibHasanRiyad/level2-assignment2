import mongoose from "mongoose";
import { TProducts } from "./products.interface";
import { Products } from "./products.model";

// create products
const createProduct = async (payload: TProducts) => {
  const result = await Products.create(payload);
  return result;
};

// get all products
const getAllProducts = async () => {
  const result = await Products.find();
  return result;
};

// get single product
const getSingleProduct = async (id: string) => {
  const result = await Products.findById(id);
  return result;
};

// update single product
const updateSingleProduct = async (
  id: string,
  updatedData: Partial<TProducts>
) => {
  const result = await Products.findByIdAndUpdate(
    new mongoose.Types.ObjectId(id),
    updatedData
  );
  return result;
};

export const ProductServices = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
};
