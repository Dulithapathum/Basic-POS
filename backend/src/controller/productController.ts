import { Request, Response } from "express";
import { productValidator } from "../validators/productValidator";
import { Product } from "../models/product";

// Product Add
export const addProducts = async (req: Request, res: Response) => {
  try {
    const validateData = productValidator.safeParse(req.body);

    if (!req.file) {
      res.status(400).json({ message: "Image is required" });
    } else {
      if (validateData.success) {
        const product = await Product.create({
          ...validateData.data,
          image: req.file.path,
        });
        res
          .status(201)
          .json({ message: "Product added successfully", product });
      } else {
        res.status(400).json({
          message: "Invalid products data",
          errors: validateData.error.issues[0].message,
        });
        console.log(validateData.error);
      }
    }
  } catch (error) {
    res.status(500).json({ message: "Error adding product", error });
  }
};

// Prodcut Delete
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    if (product) {
      res.status(200).json({ message: "product deleted successfully" });
    } else {
      res.status(404).json({ message: "product not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};

//  Get All Peoducts
export const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find();
    if (!products) {
      res.status(404).json({ message: "Customer not found" });
    } else {
      res.status(200).json({ success: true, data: products });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving customers", error });
  }
};

// Get Product By Id
export const getProductById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) {
      res.status(404).json({ message: "Customer Not Found" });
    } else {
      res.status(200).json({ success: true, product });
    }
  } catch (error) {
    res.status(500).json({ message: "Error retrieving customer", error });
  }
};

// Update Product
// TODO-LIST
