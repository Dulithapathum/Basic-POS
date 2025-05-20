import { useState } from "react";
import MenuCategories from "./menu-categories";

const ProductList = () => {
  const [activeCategory, setActiveCategory] = useState("Lunch");
  return (
    <div className="bg-blue-300 w-full">
      <div>
        {" "}
        <MenuCategories
          activeCategory={activeCategory}
          setActiveCategory={setActiveCategory}
        />
      </div>
    </div>
  );
};

export default ProductList;
