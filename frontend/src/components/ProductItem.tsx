import type { IProduct } from "@/store/slices/ProductSlice";
import { Card, CardContent } from "./ui/card";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/Store";
import { addItemToCart } from "../store/slices/CartSlice";
import { showToast } from "@/utils/toast";

interface ProductsItemProps {
  products: IProduct[];
}

const ProductItem = ({ products }: ProductsItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (product: IProduct) => {
    if (product.countInStock > 0) {
      dispatch(addItemToCart({ product, quantity: 1 }));
    } else {
      showToast("error", "This product is out of stock.");
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 max-h-9/10 overflow-auto">
      {products.map((product) => (
        <Card
          key={product._id}
          className={`cursor-pointer hover:shadow-md transition-shadow `}
          onClick={() => handleAddToCart(product)}
        >
          <CardContent className="p-0">
            <div className="flex flex-col items-center p-0">
              <div className="w-50 h-50 overflow-hidden mb-4">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="text-center font-medium text-gray-800">
                {product.name}
              </h3>

              {product.countInStock !== 0 ? (
                <p className="text-center text-green-500 text-sm mt-1">
                  In Stock: {product.countInStock}
                </p>
              ) : (
                <p className="text-center text-red-500 text-sm mt-1">
                  Out Of Stock
                </p>
              )}

              <p className="text-center font-bold text-gray-900 mt-1">
                ${product.price.toFixed(2)}
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ProductItem;
