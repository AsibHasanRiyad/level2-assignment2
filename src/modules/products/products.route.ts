import express, { Request, Response } from "express";
import { ProductControllers } from "./products.controller";
const router = express.Router();

router.post("/", ProductControllers.createProduct);
router.get("/", ProductControllers.getAllProducts);

export const ProductRoutes = router;
