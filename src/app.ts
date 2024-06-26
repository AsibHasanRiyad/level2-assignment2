import express, { Request, Response } from "express";
import { ProductRoutes } from "./modules/products/products.route";
import { OrderRoutes } from "./modules/orders/orders.route";
const app = express();

// parser
app.use(express.json());

// middleware
app.use("/api/products", ProductRoutes);
app.use("/api/orders", OrderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Order Management!");
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

export default app;
