import { TOrders } from "./orders.interface";
import { Orders } from "./orders.model";

const createOrder = async (payload: TOrders) => {
  const result = await Orders.create(payload);
  return result;
};

export const OrderServices = {
  createOrder,
};
