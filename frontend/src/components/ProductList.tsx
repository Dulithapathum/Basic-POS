import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, type IProduct } from "../store/slices/ProductSlice";
import type { RootState, AppDispatch } from "../store/Store";
import MenuItem from "./MenuItem";
import MenuCategories from "./MenuCategories";

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
      {loading && <p className="text-center p-4">Loading products...</p>}
      {error && <p className="text-center p-4 text-red-500">{error}</p>}
      <MenuCategories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <MenuItem products={filteredProducts} />
    </div>
  );
};

export default ProductList;
