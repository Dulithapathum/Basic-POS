import AddProductDialog from "@/components/AddProductDialog";
import NavBar from "../components/NavBar";
import ProductTable from "@/components/ProductTable";

const Product = () => {
  return (
    <div className="w-full flex bg-gray-100">
      <NavBar />
      <div className=" w-full mx-auto pt-5">
        <div>
          <h1 className="text-center text-xl lg:text-3xl font-bold mb-8">
            Product Management
          </h1>
          <div className="flex justify-end mr-10 ">
            <AddProductDialog />
          </div>
          <ProductTable />
        </div>
      </div>
    </div>
  );
};

export default Product;
