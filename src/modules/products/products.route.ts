import express, { Request, Response } from "express";
import { ProductControllers } from "./products.controller";
const router = express.Router();

router.post("/", ProductControllers.createProduct);
router.get("/", ProductControllers.getAllProducts);
// search route
// router.get("/search", ProductControllers.searchProduct);
router.get("/:productId", ProductControllers.getSingleProduct);
router.put("/:productId", ProductControllers.updateSingleProduct);

export const ProductRoutes = router;
