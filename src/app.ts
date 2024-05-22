import express, { Request, Response } from "express";
import { ProductRoutes } from "./modules/products/products.route";
const app = express();

// middleware
app.use("/api/v1/products", ProductRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
