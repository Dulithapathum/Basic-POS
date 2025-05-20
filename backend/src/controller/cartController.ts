import { Request, Response } from "express";
import { cartValidator } from "../validators/cartValidator";
import { Cart } from "../models/cart";
import { Product } from "../models/product";
import mongoose from "mongoose";

// Create or update cart
export const updateCart = async (req: Request, res: Response) => {
  try {
    const validateData = cartValidator.safeParse(req.body);
    if (!validateData.success) {
      res.status(400).json({
        message: "Invalid cart data",
        errors: validateData.error.issues[0].message,
      });
    } else {
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

      for (const item of formattedItems) {
        const product = await Product.findById(item.productId);

        if (product) {
          if (product.countInStock < item.quantity) {
            res.status(400).json({
              message: `Not enough stock for product: ${product.name}`,
            });
          } else {
            product.countInStock -= item.quantity;
            await product.save();
          }
        }
      }

      res.status(200).json(cart);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
