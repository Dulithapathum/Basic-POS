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
import { Card } from "@/components/ui/card";
import type { Customer } from "@/types/types";


type CustomerResponse = {
  success: boolean;
  data: Customer[];
};

const CUSTOMERS_PER_PAGE = 4;

const CustomerTable = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

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
      showToast("success", "User deleted successfully");
      setCustomers(customers.filter((customer) => customer._id !== id));
    } catch (error) {
      console.error("Failed to delete customer:", error);
      showToast("error", "Error deleting customer");
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  // Pagination logic
  const totalPages = Math.ceil(customers.length / CUSTOMERS_PER_PAGE);
  const startIndex = (currentPage - 1) * CUSTOMERS_PER_PAGE;
  const currentCustomers = customers.slice(
    startIndex,
    startIndex + CUSTOMERS_PER_PAGE
  );

  return (
    <Card className="w-[640px] lg:w-auto p-4 mx-8 mt-4 rounded-md shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Customer List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : customers.length === 0 ? (
        <p className="text-gray-600">
          No customers found. Add a new customer to get started.
        </p>
      ) : (
        <>
          <div className="h-auto rounded-lg border border-gray-200">
            <Table>
              <caption className="sr-only">Customer Data Table</caption>
              <TableHeader>
                <TableRow>
                  <TableHead>First Name</TableHead>
                  <TableHead>Last Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead className="text-center">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentCustomers.map((customer) => (
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

          <div className="flex justify-end items-center gap-4 mt-6">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>

            {Array.from({ length: totalPages }, (_, index) => (
              <Button
                key={index + 1}
                variant={currentPage === index + 1 ? "default" : "outline"}
                onClick={() => setCurrentPage(index + 1)}
              >
                {index + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </>
      )}
    </Card>
  );
};

export default CustomerTable;
