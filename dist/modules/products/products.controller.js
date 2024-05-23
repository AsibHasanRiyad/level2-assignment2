"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const products_service_1 = require("./products.service");
const products_validation_1 = require("./products.validation");
// create product
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        // data validation using zod
        const zodParsedData = products_validation_1.TProductsValidationSchema.parse(productData);
        const result = yield products_service_1.ProductServices.createProduct(zodParsedData);
        res.status(200).json({
            success: true,
            message: "Product created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add new product",
            error: error.message,
        });
    }
});
// get all products from database and search
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = req.query;
        let result;
        if (query) {
            result = yield products_service_1.ProductServices.searchProducts(query);
        }
        else {
            result = yield products_service_1.ProductServices.getAllProducts();
        }
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetched products",
            error: error.message,
        });
    }
});
// get single product by id
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield products_service_1.ProductServices.getSingleProduct(productId);
        if (result) {
            res.status(200).json({
                success: true,
                message: "Product fetched successfully!",
                data: result,
            });
        }
        else {
            // in case of searching with an id that doesn't exist in our database
            res.status(500).json({
                success: false,
                message: "Product not found",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetched products",
            error: error.message,
        });
    }
});
// update single product
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updatedData = req.body;
        const zodParsedData = products_validation_1.TProductsUpdateValidationSchema.parse(updatedData);
        const result = yield products_service_1.ProductServices.updateSingleProduct(productId, zodParsedData);
        if (result) {
            res.status(200).json({
                success: true,
                message: "Product updated successfully!",
                data: result,
            });
        }
        else {
            // in case of updating with an id that doesn't exist in our database
            res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to update products",
            error: error.message,
        });
    }
});
// delete product
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield products_service_1.ProductServices.deleteProduct(productId);
        // console.log(result.deletedCount);
        if (result.deletedCount > 0) {
            res.status(200).json({
                success: true,
                message: "Product deleted successfully!",
                data: result,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: "Product Not Found",
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Something went wrong! Please try again. ",
            error: error.message,
        });
    }
});
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateSingleProduct,
    deleteProduct,
};
