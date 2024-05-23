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
exports.OrderServices = void 0;
const orders_model_1 = require("./orders.model");
// create order
const createOrder = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Orders.create(payload);
    return result;
});
// get all orders
const getAllOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Orders.find();
    return result;
});
//  search orders by email
const searchOrders = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield orders_model_1.Orders.find({ email: { $eq: query } });
    return result;
});
exports.OrderServices = {
    createOrder,
    getAllOrders,
    searchOrders,
};
