import { Router, Request, Response, NextFunction, Express } from "express";
import {
  Product,
  createProduct,
  getProductByName,
  deleteProductById,
  IProduct,
} from "../models/products";
import db from "../database";

interface CustomRequest extends Request {
  product: any;
}
interface CustomResponse extends Response {
  product?: IProduct;
}

const router = Router();
db;
router.get("/", async (req: Request, res: Response) => {
  try {
    console.log("test");
    const products = await Product.find();
    console.log(products);
    res.json({
      product: products,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", getProduct, (req: Request, res: CustomResponse) => {
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
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
});

router.patch("/:id", getProduct, (req: Request, res: Response) => {
  res.send("patcg");
});

router.delete("/:id", getProduct, async (req: Request, res: Response) => {
  try {
    await deleteProductById(req.params.id);
    return res.json({ message: `Delete ${req.params.id}` });
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
});

async function getProduct(req: Request, res: CustomResponse, next: NextFunction) {
  let product;
  try {
    product = await Product.findById(req.params.id);
    console.log(product);
    if (!product) {
      const errorMessage = { message: "Can not find product" };
      return res.status(404).json(errorMessage);
    }
  } catch (error: any) {
    return res.status(500).json({ message: error.message });
  }
  res.product = product;
  next();
}

export default router;
