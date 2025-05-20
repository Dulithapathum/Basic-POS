import { Button } from "@/components/ui/button";

interface MenuCategoriesProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function MenuCategories({
  activeCategory,
  setActiveCategory,
}: MenuCategoriesProps) {
  const categories = [
    "Electronics",
    "Fashion",
    "Books",
    "Home",
    "Toys",
    "Sports & Outdoors",
    "Beauty & Personal Care",
    "Automotive",
  ];

  return (
    <div className="flex items-center gap-2 p-4 bg-white border-b">
      {categories.map((category) => (
        <Button
          key={category}
          variant={activeCategory === category ? "default" : "outline"}
          className={
            activeCategory === category
              ? "bg-orange-500 hover:bg-orange-600 text-white"
              : "bg-white text-gray-700 hover:bg-gray-100"
          }
          onClick={() => setActiveCategory(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
