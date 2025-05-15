import { Request, Response } from "express";
import { custom } from "zod";
import { customerSchema } from "../validators/customerSchema";
import { Customer } from "../models/Customer";

export const addCustomer = async (req: Request, res: Response) => {
  try {
    const validateData = customerSchema.safeParse(req.body);
    if (validateData.success) {
      const customer = await Customer.create(validateData.data);
      res
        .status(201)
        .json({ message: "Customer added successfully", customer });
    } else {
      res.status(400).json({
        message: "Invalid customer data",
        errors: validateData.error.issues[0].message,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Error adding customer", error });
  }
};
