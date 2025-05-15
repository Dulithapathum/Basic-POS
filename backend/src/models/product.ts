import { Schema, Model, Document, model } from "mongoose";

export interface IProduct extends Document {
  name: string;
  category: string;
  image: string;
  description: string;
  price: number;
  countInStock: number;
}

const productSchema = new Schema<IProduct>({
  name: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  countInStock: { type: Number, required: true },
});

export const Product = model<IProduct>("Product", productSchema);
