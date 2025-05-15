import { Schema, model, Document } from "mongoose";

export interface ICustomer extends Document {
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
}

const CustomerSchema = new Schema<ICustomer>(
  {
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export const Customer = model<ICustomer>("Customer", CustomerSchema);
