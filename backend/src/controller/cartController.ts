import { Request, Response } from "express";
import { cartValidator } from "../validators/cartValidator";
import { Cart } from "../models/cart";
import mongoose from "mongoose";

// // Create or update cart
export const updateCart = async (req: Request, res: Response) => {
  try {
    const validateData = cartValidator.safeParse(req.body);
    if (validateData.success) {
      const { customerId, items } = validateData.data;
      const customerObjectId = new mongoose.Types.ObjectId(customerId);

      let cart = await Cart.findOne({ customerId: customerObjectId });

      const formattedItems = items.map((item) => ({
        productId: new mongoose.Types.ObjectId(item.productId),
        quantity: item.quantity,
      }));

      if (cart) {
        cart.items = formattedItems;
        await cart.save();
      } else {
        cart = await Cart.create({
          customerId: customerObjectId,
          items: formattedItems,
        });
      }

      res.status(200).json(cart);
    } else {
      res.status(400).json({
        message: "Invalid cart data",
        errors: validateData.error.issues[0].message,
      });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

// Get cart by customer
export const getCart = async (req: Request, res: Response) => {
  const { customerId } = req.params;

  try {
    const cart = await Cart.findOne({ customerId }).populate("items.productId");
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
    } else {
      res.json(cart);
    }
  } catch (err) {
    res.status(500).json({ message: "Error retrieving cart" });
  }
};

// Clear cart
export const clearCart = async (req: Request, res: Response) => {
  const { customerId } = req.body;

  try {
    await Cart.findOneAndDelete({ customerId });
    res.status(200).json({ message: "Cart cleared" });
  } catch (err) {
    res.status(500).json({ message: "Failed to clear cart" });
  }
};
