import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface ProductCategoriesProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
}

export default function ProductCategories({
  activeCategory,
  setActiveCategory,
}: ProductCategoriesProps) {
  const categories = [
    "Electronics",
    "Fashion",
    "Books",
    "Toys",
    "Sports",
    "Beauty",
    "Automotive",
  ];

  return (
    <div className="w-full flex  justify-center">
      <Carousel className="w-75 lg:w-120 xl:w-200 my-6">
        <CarouselContent className="">
          {categories.map((category, index) => (
            <CarouselItem key={index} className=" basis-auto">
              <Button
                onClick={() => setActiveCategory(category)}
                className={`rounded px-4 py-2 text-sm whitespace-nowrap transition-colors ${
                  activeCategory === category
                    ? "bg-orange-500 hover:bg-orange-600 text-white cursor-pointer"
                    : "bg-white text-gray-700 hover:bg-gray-300 cursor-pointer"
                }`}
              >
                {category}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* <CarouselPrevious variant={"link"} />
        <CarouselNext variant={"link"} /> */}
      </Carousel>
    </div>
  );
}
