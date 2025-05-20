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
    "Sports ",
    "Beauty ",
    "Automotive",
  ];

  return (
    <div className="  ">
      <div className="flex items-center gap-2 p-4  shadow-sm ">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            className={
              activeCategory === category
                ? "bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
                : "bg-white text-gray-700 hover:bg-gray-100 cursor-pointer"
            }
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </Button>
        ))}
      </div>
    </div>
  );
}
