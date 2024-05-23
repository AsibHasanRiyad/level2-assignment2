import { TOrders } from "./orders.interface";
import { Orders } from "./orders.model";

// create order
const createOrder = async (payload: TOrders) => {
  const result = await Orders.create(payload);
  return result;
};

// get all orders
const getAllOrders = async () => {
  const result = await Orders.find();
  return result;
};

//  search orders by email
const searchOrders = async (query: any) => {
  const result = await Orders.find({ email: { $eq: query } });
  return result;
};

export const OrderServices = {
  createOrder,
  getAllOrders,
  searchOrders,
};
