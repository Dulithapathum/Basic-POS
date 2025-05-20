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

type Product = {
  _id: string;
  name: string;
  category: string;
  image: string;
  description: string;
  price: number;
  countInStock: number;
};

type ProductsResponse = {
  success: boolean;
  data: Product[];
};

const ProductTable = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const response = await axios.get<ProductsResponse>(
        `${import.meta.env.VITE_API_URL}/api/products`
      );
      setProducts(response.data.data);
    } catch (error) {
      console.error("Failed to fetch products:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      showToast("success", "Product deleted successfully");
      setProducts(products.filter((product) => product._id !== id));
    } catch (error) {
      console.error("Failed to delete product:", error);
      showToast("error", "Error deleting product");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="table-container p-8 m-10 rounded-md shadow-md bg-white">
      <h2 className="text-xl font-semibold mb-4">Product List</h2>

      {loading ? (
        <p>Loading...</p>
      ) : products.length === 0 ? (
        <p className="text-gray-600">No products found.</p>
      ) : (
        <div className="overflow-x-auto">
          <Table>
            <caption className="sr-only">Product Data Table</caption>
            <TableHeader>
              <TableRow>
                <TableHead>Image</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead className="w-[80px] text-center">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product) => (
                <TableRow key={product._id}>
                  <TableCell>
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-12 w-12 object-cover rounded"
                    />
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.description}</TableCell>
                  <TableCell>${product.price.toFixed(2)}</TableCell>
                  <TableCell>{product.countInStock}</TableCell>
                  <TableCell className="text-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteProduct(product._id)}
                      aria-label="Delete product"
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

export default ProductTable;
