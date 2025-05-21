import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../store/slices/ProductSlice";
import type { RootState, AppDispatch } from "../store/Store";
import ProductCategories from "./ProductCategories";
import ProductItem from "./ProductItem";
import type { Product } from "@/types/types";

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.product
  );
  const [activeCategory, setActiveCategory] = useState("Electronics");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    const filtered =
      activeCategory === "" || activeCategory === "All"
        ? products
        : products.filter((product) => product.category === activeCategory);

    setFilteredProducts(filtered);
  }, [activeCategory, products]);

  return (
    <div className="bg-gray-100 w-full h-screen overflow-y-auto ">
      <ProductCategories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      {loading && <p className="text-center p-4">Loading products...</p>}
      {error && <p className="text-center p-4 text-red-500">{error}</p>}
      <ProductItem products={filteredProducts} />
    </div>
  );
};

export default ProductList;
