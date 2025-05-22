import mongoose, { Schema, Document, model, Types } from "mongoose";

interface IcartItem {
  productId: Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  customerId: Types.ObjectId;
  items: IcartItem[];
}

const CartSchema = new Schema<ICart>(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Cart = model<ICart>("Cart", CartSchema);
