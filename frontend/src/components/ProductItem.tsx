import { Card, CardContent } from "./ui/card";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/store/Store";
import { addItemToCart } from "../store/slices/CartSlice";
import { showToast } from "@/utils/toast";
import type { Product } from "@/types/types";


interface ProductsItemProps {
  products: Product[];
}

const ProductItem = ({ products }: ProductsItemProps) => {
  const dispatch = useDispatch<AppDispatch>();

  const handleAddToCart = (product: Product) => {
    if (product.countInStock > 0) {
      dispatch(addItemToCart({ product, quantity: 1 }));
    } else {
      showToast("error", "This product is out of stock.");
    }
  };

  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 mx-1 lg:mx-3  ">
      {products.map((product) => (
        <Card
          key={product._id}
          className={`cursor-pointer hover:shadow-md transition-shadow `}
          onClick={() => handleAddToCart(product)}
        >
          <CardContent className="p-0 px-4 xl:px-8">
            <div className="flex flex-col items-center p-0">
              <div className="w-40 h-40 overflow-hidden mb-4">
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
