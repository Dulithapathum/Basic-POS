import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import { showToast } from "@/utils/toast";

type Customer = {
  _id: string;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  address: string;
};
type CustomerResponse = {
  success: boolean;
  data: Customer[];
};

const CustomerTable = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCustomers = async () => {
    try {
      const response = await axios.get<CustomerResponse>(
        `${import.meta.env.VITE_API_URL}/api/customers`
      );
      setCustomers(response.data.data);
    } catch (error) {
      console.error("Failed to fetch customers:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCustomer = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `${import.meta.env.VITE_API_URL}/api/customers/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      showToast("success", "User Delete SuccessFully");
      setCustomers(customers.filter((customer) => customer._id !== id));
    } catch (error) {
      console.error("Failed to delete customer:", error);
      showToast("error", "Error deleting customer");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="max-w-8xl p-8 m-10 rounded-md shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Customer List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : customers.length === 0 ? (
        <p className="text-gray-600">
          No customers found. Add a new customer to get started.
        </p>
      ) : (
        <div className="overflow-auto h-70 ">
          <Table>
            <caption className="sr-only">Customer Data Table</caption>
            <TableHeader>
              <TableRow>
                <TableHead>First Name</TableHead>
                <TableHead>Last Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone Number</TableHead>
                <TableHead>Address</TableHead>
                <TableHead className="w-[80px] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customers.map((customer) => (
                <TableRow key={customer._id}>
                  <TableCell>{customer.firstname}</TableCell>
                  <TableCell>{customer.lastname}</TableCell>
                  <TableCell>{customer.email}</TableCell>
                  <TableCell>{customer.phone}</TableCell>
                  <TableCell>{customer.address}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCustomer(customer._id)}
                      aria-label="Delete customer"
                    >
                      <Trash2 className="h-4 w-4 text-red-500" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default CustomerTable;
