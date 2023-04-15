import { Router, Request, Response, NextFunction, Express } from "express";
import type { ErrorRequestHandler } from "express";
import {
  Product,
  getProducts,
  createProduct,
  getProductByName,
  deleteProductById,
} from "../models/products";
import db from "../database";

const router = Router();
db;
router.get("/", async (req: Request, res: Response) => {
  try {
    console.log("test");
    const products = await getProducts;
    console.log(products);
    res.json({
      product: products,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get("/:id", getProduct, (req: Request, res: Response) => {
  return res.status(201).json(res.product);
});

router.post("/", async (req: Request, res: Response) => {
  let newProduct;
  const prod = await getProductByName(req.body.name);
  console.log(prod);
  if (prod) {
    return res.status(401).json({ message: `product ${req.body.name} exist` });
  }
  try {
    newProduct = await createProduct({
      name: req.body.name,
      price: req.body.price,
      unit: req.body.unit,
    });
    console.log(newProduct);
    res.status(201).json(newProduct);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.patch("/:id", getProduct, (req: Request, res: Response) => {
  res.send("patcg");
});

router.delete("/:id", getProduct, async (req: Request, res: Response) => {
  try {
    await deleteProductById(req.params.id)
    return res.json({ message: `Delete ${req.params.id}` });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

async function getProduct(req: Request, res: Response, next: NextFunction) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    console.log(product);
    if (!product) {
      return res.status(404).json({ message: "Can not find product" });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
  res.product = product;
  next();
}

export default router;
