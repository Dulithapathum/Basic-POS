import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, type IProduct } from "../store/slices/ProductSlice";
import type { RootState, AppDispatch } from "../store/Store";
import ProductCategories from "./ProductCategories";
import ProductItem from "./ProductItem";

const ProductList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error } = useSelector(
    (state: RootState) => state.product
  );
  const [activeCategory, setActiveCategory] = useState("Electronics");
  const [filteredProducts, setFilteredProducts] = useState<IProduct[]>([]);
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
    <div className="bg-gray-100 max-h-screen w-full  ">
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
