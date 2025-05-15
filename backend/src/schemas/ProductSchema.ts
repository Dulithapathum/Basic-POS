import { z } from "zod";

export const ProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  image: z.string().url("Invalid image URL"),
  description: z.string().min(1, "Product description is required"),
  price: z.number().min(0, "Product price must be positive"),
  countInStock: z.number().min(0, "Product count must be positive"),
});
