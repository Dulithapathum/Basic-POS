import AddProductDialog from "@/components/AddProductDialog";
import NavBar from "../components/NavBar";
import ProductTable from "@/components/ProductTable";

const Product = () => {
  return (
    <div className="w-full flex bg-gray-200">
      <NavBar />
      <div className=" w-full mx-auto md:py-10">
        <div>
          <h1 className="text-center text-3xl font-bold mb-16">
            Product Management
          </h1>
          <div className="flex justify-end md:mr-10 ">
            <AddProductDialog />
          </div>
          <ProductTable />
        </div>
      </div>
    </div>
  );
};

export default Product;
