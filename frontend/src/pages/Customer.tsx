import CustomerTable from "@/components/CustomerTable";
import NavBar from "../components/NavBar";
import AddCustomerDialog from "@/components/AddCustomerDialog";

const Customer = () => {
  return (
    <div className="w-full flex  bg-gray-100">
      <NavBar />
      <div className=" w-full mx-auto md:py-10">
        <div>
          <h1 className="text-center text-3xl font-bold mb-16">
            Customer Management
          </h1>
          <div className="flex justify-end md:mr-10 ">
            <AddCustomerDialog />
          </div>

          <CustomerTable />
        </div>
      </div>
    </div>
  );
};

export default Customer;
