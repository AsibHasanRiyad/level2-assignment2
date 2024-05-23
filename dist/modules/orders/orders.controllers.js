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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const orders_service_1 = require("./orders.service");
const products_service_1 = require("../products/products.service");
const orders_validation_1 = __importDefault(require("./orders.validation"));
const products_validation_1 = require("../products/products.validation");
// create a new order
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orderData = req.body;
        // console.log(req.body.productId);
        const { productId, quantity } = req.body;
        // check if product is available
        const OrderingProduct = yield products_service_1.ProductServices.getSingleProduct(productId);
        // if not available
        if (!OrderingProduct) {
            return res.status(404).json({
                success: false,
                message: "Product not found",
            });
        }
        // if Insufficient
        const availableQuantity = OrderingProduct === null || OrderingProduct === void 0 ? void 0 : OrderingProduct.inventory.quantity;
        if (availableQuantity < 1 ||
            availableQuantity < quantity) {
            return res.status(500).json({
                success: false,
                message: "Insufficient quantity available in inventory",
            });
        }
        else {
            // zod
            const zodParsedData = orders_validation_1.default.parse(orderData);
            const result = yield orders_service_1.OrderServices.createOrder(zodParsedData);
            const newQuantity = availableQuantity - quantity;
            // console.log(OrderingProduct);
            OrderingProduct.inventory.quantity = newQuantity;
            // check inStock and update
            if (newQuantity === 0) {
                OrderingProduct.inventory.inStock = false;
            }
            // zod validation for Product updating during ordering
            const zodUpdatedProductParsedData = products_validation_1.TProductsUpdateValidationSchema.parse(OrderingProduct);
            const update = yield products_service_1.ProductServices.updateSingleProduct(productId, zodUpdatedProductParsedData);
            // console.log(update, "Update");
            res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: result,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add new product",
            error: error.message,
        });
    }
});
// get all orders
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        let result;
        // get products by search
        if (email) {
            result = yield orders_service_1.OrderServices.searchOrders(email);
            // if no orders found for a specific email
            if (!result || result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "Order not found",
                });
            }
        }
        else {
            // get all products
            result = yield orders_service_1.OrderServices.getAllOrders();
        }
        return res.status(200).json({
            success: true,
            message: "Orders fetched successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch orders",
            error: error.message,
        });
    }
});
exports.OrderControllers = {
    createOrder,
    getAllOrders,
};
