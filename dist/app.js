"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const products_route_1 = require("./modules/products/products.route");
const orders_route_1 = require("./modules/orders/orders.route");
const app = (0, express_1.default)();
// parser
app.use(express_1.default.json());
// middleware
app.use("/api/products", products_route_1.ProductRoutes);
app.use("/api/orders", orders_route_1.OrderRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to Order Management!");
});
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
exports.default = app;
