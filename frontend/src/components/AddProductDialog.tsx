import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/Store";
import { addProduct } from "@/store/slices/ProductSlice";
import { showToast } from "@/utils/toast";

const formSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  description: z.string().min(1, "Description is required"),
  price: z.coerce.number().min(0, "Price must be a positive number"),
  countInStock: z.coerce.number().min(0, "Count must be a positive number"),
  image: z
    .any()
    .refine((files) => files?.length === 1, { message: "Image is required" }),
});

type FormData = z.infer<typeof formSchema>;

const AddProductDialog = () => {
  const [open, setOpen] = useState(false);
  const [inputKey, setInputKey] = useState(Date.now());
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("category", data.category);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("countInStock", data.countInStock.toString());
    formData.append("image", data.image[0]);

    try {
      await dispatch(addProduct(formData)).unwrap();
      showToast("success", "Product added successfully.");
      reset();
      setInputKey(Date.now());
      setOpen(false); 
    } catch (error: any) {
      showToast("error", error || "Failed to add product");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#ff1111] hover:bg-red-800 text-white">
          <Plus className="mr-2 h-4 w-4" />
          Add New Product
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="sm:max-w-[600px] bg-white border-none"
      >
        <DialogHeader>
          <DialogTitle className="text-center">Add New Product</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="name">Product Name</Label>
            <input
              id="name"
              {...register("name")}
              className="w-full p-2 mt-1 border-2 border-black rounded-sm outline-none hover:border-[#ff3131] transition"
            />
            {errors.name && (
              <p className="text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="category">Category</Label>
            <select
              id="category"
              {...register("category")}
              className="w-full p-2 mt-1 border-2 border-black rounded-sm outline-none hover:border-[#ff3131] transition"
            >
              <option value="">Select category</option>
              <option value="Electronics">Electronics</option>
              <option value="Fashion">Fashion</option>
              <option value="Books">Books</option>
              <option value="Home">Home</option>
              <option value="Toys">Toys</option>
              <option value="Sports">Sports & Outdoors</option>
              <option value="Beauty">Beauty & Personal Care</option>
              <option value="Automotive">Automotive</option>
            </select>
            {errors.category && (
              <p className="text-sm text-red-500">{errors.category.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="image">Product Image</Label>
            <input
              key={inputKey}
              type="file"
              id="image"
              {...register("image")}
              accept="image/*"
              className="w-full p-2 mt-1 border-2 border-black rounded-sm outline-none hover:border-[#ff3131] transition"
            />
            {errors.image?.message && (
              <p className="text-sm text-red-500">
                {String(errors.image.message)}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              {...register("description")}
              className="w-full p-2 mt-1 border-2 border-black rounded-sm outline-none hover:border-[#ff3131] transition"
              rows={3}
            />
            {errors.description && (
              <p className="text-sm text-red-500">
                {errors.description.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="price">Price</Label>
            <input
              type="number"
              step="0.01"
              id="price"
              {...register("price")}
              className="w-full p-2 mt-1 border-2 border-black rounded-sm outline-none hover:border-[#ff3131] transition"
            />
            {errors.price && (
              <p className="text-sm text-red-500">{errors.price.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="countInStock">Count In Stock</Label>
            <input
              type="number"
              id="countInStock"
              {...register("countInStock")}
              className="w-full p-2 mt-1 border-2 border-black rounded-sm outline-none hover:border-[#ff3131] transition"
            />
            {errors.countInStock && (
              <p className="text-sm text-red-500">
                {errors.countInStock.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-[#ff1111] hover:bg-red-800 text-white"
            >
              Submit
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddProductDialog;
