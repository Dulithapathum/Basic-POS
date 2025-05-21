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
import axios from "axios";
import { showToast } from "@/utils/toast";

const formSchema = z.object({
  firstname: z.string().min(1, "First name is required"),
  lastname: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z
    .string()
    .length(10, "Phone number must be exactly 10 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  address: z.string().min(1, "Address is required"),
});

type FormData = z.infer<typeof formSchema>;

const AddCustomerDialog = () => {
  const [open, setOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`${import.meta.env.VITE_API_URL}/api/customers`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showToast("success", "Customer Added Successfully.");
      reset();
      setOpen(false);
    } catch (error) {
      console.error("Failed to add customer:", error);
      showToast("error", "Error Adding customer");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-[#ff1111] hover:bg-red-800 text-white">
          <Plus className=" h-4 w-4" />
          Add New Customer
        </Button>
      </DialogTrigger>
      <DialogContent
        aria-describedby={undefined}
        className="sm:max-w-[600px] bg-white border-none"
      >
        <DialogHeader>
          <DialogTitle className="text-center">Add New Customer</DialogTitle>
        </DialogHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-1 lg:space-y-2"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstname">First Name</Label>
              <input
                id="firstname"
                {...register("firstname")}
                className="w-full p-2 mt-1 outline-none bg-white rounded-sm border-2 border-black hover:border-[#ff3131] transition-colors duration-300"
              />
              {errors.firstname && (
                <p className="text-sm text-red-500">
                  {errors.firstname.message}
                </p>
              )}
            </div>

            <div>
              <Label htmlFor="lastname">Last Name</Label>
              <input
                id="lastname"
                {...register("lastname")}
                className="w-full p-2 mt-1 outline-none bg-white rounded-sm border-2 border-black hover:border-[#ff3131] transition-colors duration-300"
              />
              {errors.lastname && (
                <p className="text-sm text-red-500">
                  {errors.lastname.message}
                </p>
              )}
            </div>
          </div>

          <div>
            <Label htmlFor="email">Email</Label>
            <input
              id="email"
              type="email"
              {...register("email")}
              className="w-full p-2 mt-1 outline-none bg-white rounded-sm border-2 border-black hover:border-[#ff3131] transition-colors duration-300"
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="phone">Phone Number</Label>
            <input
              id="phone"
              {...register("phone")}
              className="w-full p-2 mt-1 outline-none bg-white rounded-sm border-2 border-black hover:border-[#ff3131] transition-colors duration-300"
            />
            {errors.phone && (
              <p className="text-sm text-red-500">{errors.phone.message}</p>
            )}
          </div>

          <div>
            <Label htmlFor="address">Address</Label>
            <input
              id="address"
              {...register("address")}
              className="w-full p-2 mt-1 outline-none bg-white rounded-sm border-2 border-black hover:border-[#ff3131] transition-colors duration-300"
            />
            {errors.address && (
              <p className="text-sm text-red-500">{errors.address.message}</p>
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

export default AddCustomerDialog;
