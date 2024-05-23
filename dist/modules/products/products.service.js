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
exports.ProductServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const products_model_1 = require("./products.model");
// create products
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Products.create(payload);
    return result;
});
// get all products
const getAllProducts = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Products.find();
    return result;
});
// get single product
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Products.findById(id);
    return result;
});
// search products
const searchProducts = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const search = {};
    if (query.searchTerm) {
        search.name = { $regex: query.searchTerm, $options: "i" };
    }
    const result = yield products_model_1.Products.find(search);
    return result;
});
// update single product
const updateSingleProduct = (id, updatedData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Products.findByIdAndUpdate(new mongoose_1.default.Types.ObjectId(id), updatedData);
    return result;
});
// delete product
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield products_model_1.Products.deleteOne({
        _id: new mongoose_1.default.Types.ObjectId(id),
    });
    return result;
});
exports.ProductServices = {
    createProduct,
    getAllProducts,
    getSingleProduct,
    updateSingleProduct,
    searchProducts,
    deleteProduct,
};
