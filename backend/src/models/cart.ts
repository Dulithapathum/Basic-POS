import mongoose, { Schema, Document, model, Types } from "mongoose";

interface IcartItem {
  ProductId: Types.ObjectId;
  quantity: number;
}

export interface ICart extends Document {
  customerId: Types.ObjectId;
  item: IcartItem[];
}

const CartSchema = new Schema<ICart>(
  {
    customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    item: [
      {
        ProductId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
      },
    ],
  },
  { timestamps: true }
);

export const Cart = model<ICart>("Cart", CartSchema);
