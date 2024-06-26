import { Request, Response } from "express";
import { ProductServices } from "./products.service";
import {
  TProductsUpdateValidationSchema,
  TProductsValidationSchema,
} from "./products.validation";

// create product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

    // data validation using zod
    const zodParsedData = TProductsValidationSchema.parse(productData);
    const result = await ProductServices.createProduct(zodParsedData);
    res.status(200).json({
      success: true,
      message: "Product created successfully!",
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
// get all products from database and search
const getAllProducts = async (req: Request, res: Response) => {
  try {
    const query = req.query;
    let result;
    if (query) {
      result = await ProductServices.searchProducts(query);
    } else {
      result = await ProductServices.getAllProducts();
    }
    res.status(200).json({
      success: true,
      message: "Product fetched successfully!",
      data: result,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetched products",
      error: error.message,
    });
  }
};
// get single product by id
const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.getSingleProduct(productId);
    if (result) {
      res.status(200).json({
        success: true,
        message: "Product fetched successfully!",
        data: result,
      });
    } else {
      // in case of searching with an id that doesn't exist in our database
      res.status(500).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetched products",
      error: error.message,
    });
  }
};

// update single product
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedData = req.body;
    const zodParsedData = TProductsUpdateValidationSchema.parse(updatedData);
    const result = await ProductServices.updateSingleProduct(
      productId,
      zodParsedData
    );
    if (result) {
      res.status(200).json({
        success: true,
        message: "Product updated successfully!",
        data: result,
      });
    } else {
      // in case of updating with an id that doesn't exist in our database
      res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to update products",
      error: error.message,
    });
  }
};

// delete product
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProduct(productId);
    // console.log(result.deletedCount);
    if (result.deletedCount > 0) {
      res.status(200).json({
        success: true,
        message: "Product deleted successfully!",
        data: result,
      });
    } else {
      res.status(500).json({
        success: false,
        message: "Product Not Found",
      });
    }
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong! Please try again. ",
      error: error.message,
    });
  }
};

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  deleteProduct,
};
