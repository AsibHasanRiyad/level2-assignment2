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
  res.send("Hello World!");
});

export default app;
