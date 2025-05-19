import AddProductDialog from "@/components/AddProductDialog";
import NavBar from "../components/NavBar";

const Product = () => {
  return (
    <div className="w-full flex bg-gray-200">
      <NavBar />
      <div className=" w-full mx-auto md:py-10">
        <div>
          <h1 className="text-center text-3xl font-bold mb-16">
            Customer Management
          </h1>
          <div className="flex justify-end md:mr-10 ">
            <AddProductDialog />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
