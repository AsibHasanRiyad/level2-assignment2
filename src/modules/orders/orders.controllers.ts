import { Request, Response } from "express";
import { OrderServices } from "./orders.service";

// create a new order
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    const result = await OrderServices.createOrder(orderData);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to add new product",
      error: error.message,
    });
  }
};

// get all orders
const getAllOrders = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    let result;
    if (email) {
      result = await OrderServices.searchOrders(email);
      if (!result || result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }
    } else {
      result = await OrderServices.getAllOrders();
    }
    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

export const OrderControllers = {
  createOrder,
  getAllOrders,
};
