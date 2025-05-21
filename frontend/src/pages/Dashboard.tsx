import ProductList from "@/components/ProductList";
import NavBar from "../components/NavBar";
import Cart from "@/components/Cart";

const Dashboard = () => {
  return (
    <div className="w-full flex justify-between bg-gray-200">
      <NavBar />
      <ProductList />
      <Cart />
    </div>
  );
};

export default Dashboard;
