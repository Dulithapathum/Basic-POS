import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { showToast } from "../utils/toast";
import { loginSchema } from "@/validators/validators";

type LoginFormInputs = z.infer<typeof loginSchema>;

const AdminLogin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
  });

  const [showpassword, setShowPassword] = useState<boolean>(false);
  const navigate = useNavigate();

  const togglePassword = () => {
    setShowPassword(!showpassword);
  };

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/admin/login`,
        data
      );

      localStorage.setItem("token", response.data.token);
      showToast("success", "Login successful");
      navigate("/");
    } catch (error: any) {
      showToast("error", error.response?.data?.message || error.message);
    }
  };
  return (
    <div className="w-full h-screen mx-auto flex items-center justify-center bg-[#efefef]">
      <div className="max-w-4xl m-3 sm:m-0 flex flex-col sm:flex-row items-center bg-[#FFC903] rounded-lg">
        <div className="w-0 sm:w-1/2">
          <img src="/login.webp" alt="" className="w-full rounded-l-lg" />
        </div>
        <div className="sm:w-1/2 py-10 px-10">
          <h2 className="text-center font-bold text-3xl mb-2">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label className="font-semibold">
                Email<span className="text-red-500"> *</span>
              </label>
              <input
                {...register("email")}
                type="email"
                placeholder="Enter email"
                className="w-full p-2 mt-1 outline-none bg-white rounded-sm border-2 border-white hover:border-[#ff3131] transition-colors duration-300"
              />
              {errors.email && (
                <p className="text-red-500 text-sm pt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <label className="font-semibold">
                Password<span className="text-red-500"> *</span>
              </label>
              <div className="flex items-center p-2 bg-white rounded-sm border-2 border-white hover:border-[#ff3131] transition-colors duration-300">
                <input
                  {...register("password")}
                  type={showpassword ? "text" : "password"}
                  placeholder="Enter password"
                  className="w-full outline-none h-full"
                />
                <span
                  className="text-gray-500 cursor-pointer"
                  onClick={togglePassword}
                >
                  {showpassword ? <FaRegEye /> : <FaRegEyeSlash />}
                </span>
              </div>
              {errors.password && (
                <p className="text-red-500 text-sm pt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#ff1111] hover:bg-red-600 text-white font-bold p-2 rounded-sm cursor-pointer"
            >
              Login
            </button>
            <p className="mt-2 text-center text-sm text-white">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-[#ff1111] hover:text-white transition-colors duration-300"
              >
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
