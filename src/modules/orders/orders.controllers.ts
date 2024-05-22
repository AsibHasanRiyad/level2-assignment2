import { Request, Response } from "express";
import { OrderServices } from "./orders.service";
import { ProductServices } from "../products/products.service";
import { TProducts } from "../products/products.interface";

// create a new order
const createOrder = async (req: Request, res: Response) => {
  try {
    const orderData = req.body;
    console.log(req.body.productId);
    const { productId, quantity } = req.body;

    // check if product is available
    const OrderingProduct = await ProductServices.getSingleProduct(productId);
    const availableQuantity = OrderingProduct?.inventory.quantity;
    // if not available
    if (
      (availableQuantity as number) < 1 ||
      (availableQuantity as number) < quantity
    ) {
      return res.status(500).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    } else {
      const result = await OrderServices.createOrder(orderData);
      const newQuantity = (availableQuantity as number) - quantity;
      console.log(OrderingProduct);
      (OrderingProduct as TProducts).inventory.quantity = newQuantity;
      const update = await ProductServices.updateSingleProduct(
        productId,
        OrderingProduct as TProducts
      );
      res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: result,
      });
    }
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
    // get products by search
    if (email) {
      result = await OrderServices.searchOrders(email);
      // if no orders found for a specific email
      if (!result || result.length === 0) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }
    } else {
      // get all products
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
