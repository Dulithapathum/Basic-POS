import { useState, useEffect } from "react";

import MenuItem from "./MenuItem";
import MenuCategories from "./menuCategories";

const mockProducts = [
  {
    _id: "1",
    name: "Wireless Headphones",
    category: "Electronics",
    image:
      "https://rangashopping.lk/wp-content/uploads/2024/08/WH-CH520-Wireless-Headphones-with-Microphone-in-Sri-Lanka.webp",
    description: "High-quality wireless headphones with noise cancellation.",
    price: 199.99,
    countInStock: 25,
  },
  {
    _id: "2",
    name: "Smartphone 12 Pro",
    category: "Electronics",
    image: "https://onei.lk/wp-content/uploads/2024/10/57-1.webp",
    description:
      "Latest smartphone with powerful processor and amazing camera.",
    price: 999.99,
    countInStock: 15,
  },
  {
    _id: "3",
    name: "Casual T-Shirt",
    category: "Electronics",
    image:
      "https://coolplanet.lk/cdn/shop/files/0065_DSC05156.jpg?v=1742303979",
    description: "Comfortable cotton T-shirt for everyday wear.",
    price: 19.99,
    countInStock: 50,
  },
  {
    _id: "4",
    name: "Novel - Mystery of the Night",
    category: "Electronics",
    image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1626787181i/57517908.jpg",
    description: "A thrilling mystery novel.",
    price: 12.99,
    countInStock: 40,
  },
  {
    _id: "5",
    name: "Smart Vacuum",
    category: "Electronics",
    image:
      "https://www.lg.com/lk/images/vacuum-cleaners/md07518820/gallery/VR66800VWP-Robot-Vacuums-Vacuum-Cleaners_D-1.jpg",
    description: "Smart robotic vacuum cleaner with auto-scheduling.",
    price: 249.99,
    countInStock: 12,
  },
  {
    _id: "6",
    name: "Basketball",
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/81S5r02f8+L.jpg",
    description: "Durable and grippy professional basketball.",
    price: 29.99,
    countInStock: 22,
  },
  {
    _id: "1",
    name: "Wireless Headphones",
    category: "Electronics",
    image:
      "https://rangashopping.lk/wp-content/uploads/2024/08/WH-CH520-Wireless-Headphones-with-Microphone-in-Sri-Lanka.webp",
    description: "High-quality wireless headphones with noise cancellation.",
    price: 199.99,
    countInStock: 25,
  },
  {
    _id: "2",
    name: "Smartphone 12 Pro",
    category: "Electronics",
    image: "https://onei.lk/wp-content/uploads/2024/10/57-1.webp",
    description:
      "Latest smartphone with powerful processor and amazing camera.",
    price: 999.99,
    countInStock: 15,
  },
  {
    _id: "3",
    name: "Casual T-Shirt",
    category: "Electronics",
    image:
      "https://coolplanet.lk/cdn/shop/files/0065_DSC05156.jpg?v=1742303979",
    description: "Comfortable cotton T-shirt for everyday wear.",
    price: 19.99,
    countInStock: 50,
  },
  {
    _id: "4",
    name: "Novel - Mystery of the Night",
    category: "Electronics",
    image:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1626787181i/57517908.jpg",
    description: "A thrilling mystery novel.",
    price: 12.99,
    countInStock: 40,
  },
  {
    _id: "5",
    name: "Smart Vacuum",
    category: "Electronics",
    image:
      "https://www.lg.com/lk/images/vacuum-cleaners/md07518820/gallery/VR66800VWP-Robot-Vacuums-Vacuum-Cleaners_D-1.jpg",
    description: "Smart robotic vacuum cleaner with auto-scheduling.",
    price: 249.99,
    countInStock: 12,
  },
  {
    _id: "6",
    name: "Basketball",
    category: "Electronics",
    image: "https://m.media-amazon.com/images/I/81S5r02f8+L.jpg",
    description: "Durable and grippy professional basketball.",
    price: 29.99,
    countInStock: 22,
  },
];

const ProductList = () => {
  const [activeCategory, setActiveCategory] = useState("Electronics");
  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  useEffect(() => {
    const filtered =
      activeCategory === "" || activeCategory === "All"
        ? mockProducts
        : mockProducts.filter((product) => product.category === activeCategory);

    setFilteredProducts(filtered);
  }, [activeCategory]);

  return (
    <div className="bg-gray-100 max-h-screen w-full  ">
      <MenuCategories
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />
      <MenuItem products={filteredProducts} />
    </div>
  );
};

export default ProductList;
