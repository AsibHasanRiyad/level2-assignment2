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

export const OrderServices = {
  createOrder,
  getAllOrders,
};
