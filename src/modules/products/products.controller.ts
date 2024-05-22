import { Request, Response } from "express";
import { ProductServices } from "./products.service";

// create product
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;
    const result = await ProductServices.createProduct(productData);
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

// search product
// const searchProduct = async (req: Request, res: Response) => {
//   try {
//     const query = req.query;
//     const result = await ProductServices.searchProducts(query);
//     res.status(200).json({
//       success: true,
//       message: "Product fetched successfully!",
//       data: result,
//     });
//   } catch (error: any) {
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetched products",
//       error: error.message,
//     });
//   }
// };

// update single product
const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedData = req.body;
    const result = await ProductServices.updateSingleProduct(
      productId,
      updatedData
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

export const ProductControllers = {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateSingleProduct,
  // searchProduct,
};
