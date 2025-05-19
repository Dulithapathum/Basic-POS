import {
  AiOutlineHome,
  AiOutlinePoweroff,
  AiOutlineSetting,
  AiOutlineShopping,
  AiOutlineTags,
  AiOutlineUser,
} from "react-icons/ai";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;

  return (
    <div className="bg-white max-w-20 w-full h-screen flex flex-col items-center justify-between py-2">
      <div className="w-18">
        <Link to="/">
          <img src="/logo.webp" alt="logo" className="w-full" />
        </Link>
      </div>

      <div>
        <Link to="/">
          <div
            className={`p-4 border-2 my-3 rounded transition-colors duration-300 ${
              isActive("/")
                ? "border-[#ff1111] bg-red-100"
                : "border-white hover:border-[#ff1111] hover:bg-red-100"
            }`}
          >
            <AiOutlineHome className="text-[#ff1111] text-2xl" />
          </div>
        </Link>

        <Link to="/customer">
          <div
            className={`p-4 border-2 my-3 rounded transition-colors duration-300 ${
              isActive("/customer")
                ? "border-[#ff1111] bg-red-100"
                : "border-white hover:border-[#ff1111] hover:bg-red-100"
            }`}
          >
            <AiOutlineUser className="text-[#ff1111] text-2xl" />
          </div>
        </Link>

        <Link to="/products">
          <div
            className={`p-4 border-2 my-3 rounded transition-colors duration-300 ${
              isActive("/products")
                ? "border-[#ff1111] bg-red-100"
                : "border-white hover:border-[#ff1111] hover:bg-red-100"
            }`}
          >
            <AiOutlineTags className="text-[#ff1111] text-2xl" />
          </div>
        </Link>

        <Link to="/orders">
          <div
            className={`p-4 border-2 my-3 rounded transition-colors duration-300 ${
              isActive("/orders")
                ? "border-[#ff1111] bg-red-100"
                : "border-white hover:border-[#ff1111] hover:bg-red-100"
            }`}
          >
            <AiOutlineShopping className="text-[#ff1111] text-2xl" />
          </div>
        </Link>

        <Link to="/setting">
          <div
            className={`p-4 border-2 my-3 rounded transition-colors duration-300 ${
              isActive("/setting")
                ? "border-[#ff1111] bg-red-100"
                : "border-white hover:border-[#ff1111] hover:bg-red-100"
            }`}
          >
            <AiOutlineSetting className="text-[#ff1111] text-2xl" />
          </div>
        </Link>
      </div>

      <Link to="/logout">
        <div
          className={`p-4 border-2 my-3 rounded transition-colors duration-300 border-white "
          }`}
        >
          <AiOutlinePoweroff className="text-gray-500 hover:text-[#ff1111] text-2xl" />
        </div>
      </Link>
    </div>
  );
};

export default NavBar;
