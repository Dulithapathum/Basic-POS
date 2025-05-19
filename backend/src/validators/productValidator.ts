import { z } from "zod";

export const productValidator = z.object({
  name: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Product description is required"),
  price: z.coerce.number().min(0, "Product price must be positive"),
  countInStock: z.coerce.number().min(0, "Product count must be positive"),
});
