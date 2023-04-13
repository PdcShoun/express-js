import mongoose, { Schema, model, connect } from "mongoose";

interface IProduct {
  name: string;
  price: number;
  unit: string;
}

const productSchema = new Schema<IProduct>({
  name: {
    type: String,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  unit: String,
});

const Product = model<IProduct>("Product", productSchema);

export default Product;
