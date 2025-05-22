import { Request, Response } from "express";

import { Customer } from "../models/Customer";
import { customerValidator } from "../validators/customerValidator";

// Customer Add
export const addCustomer = async (req: Request, res: Response) => {
  try {
    const validateData = customerValidator.safeParse(req.body);
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

// Customer Delete
export const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findByIdAndDelete(id);
    if (customer) {
      res.status(200).json({ message: "Customer deleted successfully" });
    } else {
      res.status(404).json({ message: "Customer not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting customer", error });
  }
};

// Get All Customers
export const getAllCustomer = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.find();
    if (!customers) {
      res.status(404).json({ message: "Customer not found" });
    } else {
      res.status(200).json({ success: true, data: customers });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving customers", error });
  }
};

// Get Customers by id
export const getCustomerById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const customer = await Customer.findById(id);
    if (!customer) {
      res.status(404).json({ message: "Customer Not Found" });
    } else {
      res.status(200).json({ success: true, customer });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving customer", error });
  }
};
