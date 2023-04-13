import { Router, Request, Response } from "express";
import Product from "../models/products";
import db from "../database";

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
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.get("/:id", (req: Request, res: Response) => {
  res.send("GET id");
});

router.post("/", async (req: Request, res: Response) => {
  console.log(req.body);
  res.send("GET id");
  // const product = new Product({
  //   name: req.body.name,
  //   price: req.body.price,
  //   unit: req.body.unit,
  // });
  // try {
  //   const newProduct = await product.save();
  //   res.status(201).json(newProduct);
  // } catch (err) {
  //   res.status(400).json({message: err.message})
  // }
});
router.patch("/", (req: Request, res: Response) => {
  res.send("patcg");
});
router.delete("/", (req: Request, res: Response) => {
  res.send("delete");
});

export default router;
