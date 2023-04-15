import { Schema, model } from "mongoose";

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

export const Product = model<IProduct>("Product", productSchema);
export const getProducts = Product.find();
export const getProductById = (id: string) => Product.findById(id);
export const createProduct = (values: IProduct) =>
  new Product(values).save().then((prod) => prod.toObject());
export const getProductByName = (name: string) => Product.findOne({ name });
export const deleteProductById = (id: string) =>
  Product.findOneAndDelete({ _id: id });
export { IProduct };
